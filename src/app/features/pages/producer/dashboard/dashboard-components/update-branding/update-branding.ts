import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WeatherDashboard } from '../../../../../../core/types/weather/weather-dashboard';
import { ICONS_DASHBOARD } from '../../../../../../core/ui/icons/icons-producer/icons-dashboard/icons-dashboard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-update-branding',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './update-branding.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateBranding {
  weatherDashboard = input<WeatherDashboard | null>();
  icons = ICONS_DASHBOARD;
}
