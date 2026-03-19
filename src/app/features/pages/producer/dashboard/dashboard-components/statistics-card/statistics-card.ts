import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangeDetectionStrategy } from '@angular/core';
import { WeatherStatistics } from '../../../../../../core/types/weather/weather-statistics';
import { ICONS_DASHBOARD } from '../../../../../../core/ui/icons/icons-producer/icons-dashboard/icons-dashboard';

@Component({
  selector: 'app-statistics-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './statistics-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsCard {
  statistics = input<WeatherStatistics | null>(null);
  icons = ICONS_DASHBOARD;

  stressColor(level: string): string {
    const map: Record<string, string> = {
      'LOW': 'text-green-400',
      'MODERATE': 'text-yellow-400',
      'HIGH': 'text-orange-400',
      'CRITICAL': 'text-red-400'
    };
    return map[level] ?? 'text-neutral-secondary';
  }

  stressLabel(level: string): string {
    const map: Record<string, string> = {
      'LOW': 'Baixo',
      'MODERATE': 'Moderado',
      'HIGH': 'Alto',
      'CRITICAL': 'Crítico'
    };
    return map[level] ?? level;
  }
}