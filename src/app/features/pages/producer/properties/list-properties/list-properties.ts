import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertyResponse } from '@core/types/property/property.response';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
import { PropertyService } from '@core/services/property.service';
import { PropertyCard } from '../property-card/property-card';
import { PropertyUpdateModal } from '../property-update-modal/property-update-modal';

@Component({
  selector: 'app-list-properties',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PropertyCard,
    PropertyUpdateModal
  ],
  templateUrl: './list-properties.html',
})
export class ListProperties implements OnInit {
  private propertyService = inject(PropertyService);

  icons = ICONS_PROPERTY;

  properties = signal<PropertyResponse[]>([]);
  loading = signal(true);
  selectedProperty = signal<PropertyResponse | null>(null);

  ngOnInit() {
    this.loading();
  }

  load() {
    this.loading.set(true);
    this.propertyService.findMyProperties().subscribe({
      next: page => {
        this.properties.set(page.content ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    })
  }

  openUpdate(property: PropertyResponse) {
    this.selectedProperty.set(property);
  }

  onUpdated(updated: PropertyResponse) {
    this.properties.update(list => 
      list.map(property => {
        if (property.id === updated.id) {
          return updated;
        }
        return property;
      })
    )
  }

  onModalClose() {
    this.selectedProperty.set(null);
  }
}
