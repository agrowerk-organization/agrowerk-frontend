import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PropertyResponse } from '@core/types/property/property.response';
import { Title } from '@shared/components/title/title';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_DASHBOARD } from '@core/ui/icons/icons-producer/icons-dashboard/icons-dashboard';
import { Badge } from '@shared/components/badge/badge';
import { Subtitle } from '@shared/components/subtitle/subtitle';
@Component({
  selector: 'app-welcome-banner',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, Title, Subtitle, Badge],
  templateUrl: './welcome-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeBanner {
  property = input.required<PropertyResponse>();
  icons = ICONS_DASHBOARD;

  greeting = computed(() => {
    const hour = new Date().getHours();
      if (hour < 12) return 'Bom dia';
      if (hour < 18) return 'Boa tarde';
      return 'Boa noite';
  });

  badges = computed(() => [
    { icon: this.icons.LOCATION_DOT, text: this.property().name },
    { icon: this.icons.MAP,          text: `${this.property().address?.municipality} — ${this.property().stateName}` },
    { icon: this.icons.SEEDLING,     text: `${this.property().totalArea} ha` }
  ]);
}
