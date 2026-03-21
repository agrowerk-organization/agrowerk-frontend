import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangeDetectionStrategy } from '@angular/core';
import { ICONS_DASHBOARD } from '@core/ui/icons/icons-producer/icons-dashboard/icons-dashboard';
import { WeatherAlert } from '@core/types/weather/weather-alert';
@Component({
  selector: 'app-alerts-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './alerts-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsCard {
  alerts = input<WeatherAlert[]>([]);
  icons = ICONS_DASHBOARD;

  hasAlerts = computed(() => this.alerts().length > 0);

  alertClass(severity: string): string {
    const map: Record<string, string> = {
      'CRITICAL': 'text-red-400 border-red-500/30 bg-red-500/10',
      'HIGH':     'text-orange-400 border-orange-500/30 bg-orange-500/10',
      'MEDIUM':   'text-yellow-300 border-yellow-500/30 bg-yellow-500/10',
      'LOW':      'text-blue-400 border-blue-500/30 bg-blue-500/10'
    };
    return map[severity] ?? map['LOW'];
  }
}