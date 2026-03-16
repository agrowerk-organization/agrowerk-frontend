import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PropertyResponse } from '../../../../../../core/types/property/property.response';
@Component({
  selector: 'app-welcome-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeBanner {
  name = input.required<string>();
  property = input.required<PropertyResponse>();

  greeting = computed(() => {
    const hour = new Date().getHours();
      if (hour < 12) return 'Bom dia';
      if (hour < 18) return 'Boa tarde';
      return 'Boa noite';
  });

  firstName = computed(() => this.property.name.split(' ')[0]); 
}
