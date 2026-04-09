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
      'CRITICAL': 'text-red-300    border-red-400/60    bg-red-500/20',
      'HIGH':     'text-orange-300 border-orange-400/60 bg-orange-500/20',
      'MEDIUM':   'text-yellow-300 border-yellow-400/60 bg-yellow-500/20',
      'LOW':      'text-blue-300   border-blue-400/60   bg-blue-500/20',
    };
    return map[severity] ?? map['LOW'];
  }
  
  badgeClass(severity: string): string {
    const map: Record<string, string> = {
      'CRITICAL': 'border-red-400    bg-red-500/30    text-red-200',
      'HIGH':     'border-orange-400 bg-orange-500/30 text-orange-200',
      'MEDIUM':   'border-yellow-400 bg-yellow-500/30 text-yellow-200',
      'LOW':      'border-blue-400   bg-blue-500/30   text-blue-200',
    };
    return map[severity] ?? map['LOW'];
  }
}