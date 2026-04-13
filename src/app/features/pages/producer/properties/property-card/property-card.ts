import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertyResponse } from '@core/types/property/property.response';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
import { WeatherLocationService } from '@core/services/weather-location.service';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { Badge } from '@shared/components/badge/badge';
import { AvatarDisplay } from '@shared/components/avatar-display/avatar-display';
@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    Badge,
    ButtonPages,
    AvatarDisplay
  ],
  templateUrl: './property-card.html',
})
export class PropertyCard {

  property = input.required<PropertyResponse>();
  edit = output<PropertyResponse>();
  view = output<PropertyResponse>();
  mode = input<'edit' | 'view'>('edit');

  associatingWeather = signal(false);
  private weatherLocationService = inject(WeatherLocationService);

  icons = ICONS_PROPERTY;

  weatherAssociated = output<void>();
  associateSuccess  = signal(false);

  onAssociateWeather(): void {
    const p = this.property();
    if (!p.latitude || !p.longitude) return;

    this.associatingWeather.set(true);

    this.weatherLocationService.createLocation({
      name:       p.name,
      latitude:   p.latitude,
      longitude:  p.longitude,
      state:      p.stateAbbreviation,
      propertyId: p.id,
    }).subscribe({
      next: () => {
        this.associatingWeather.set(false);
        this.associateSuccess.set(true);
        setTimeout(() => {
          this.associateSuccess.set(false);
          this.weatherAssociated.emit();
        }, 2000);
      },
      error: () => this.associatingWeather.set(false),
    });
  }

  badges = computed(() => [
    { icon: this.icons.SEEDLING, text: this.property().mainCrop },
  ]);
}
