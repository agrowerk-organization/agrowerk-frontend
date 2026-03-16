import { Component, computed, input } from '@angular/core'; import { ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_DASHBOARD } from '../../../../../../core/ui/icons/icons-producer/icons-dashboard/icons-dashboard';
import { WeatherCurrent } from '../../../../../../core/types/weather/weather-current';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './weather-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCard {
  current = input<WeatherCurrent | null>(null);
  icons = ICONS_DASHBOARD;

  getIconPath = computed(() => {
    const code = this.current()?.weatherCode ?? -1;
    if (code === 0) return { path: 'assets/svgs/sunny.svg', color: '#FFB900' };
    if (code <= 3) return { path: 'assets/svgs/partly-cloudy.svg', color: '#94A3B8' };
    if (code <= 48) return { path: 'assets/svgs/cloudy.svg', color: '#94A3B8' };
    if (code <= 67) return { path: 'assets/svgs/rain.svg', color: '#3B82F6' };
    if (code <= 77) return { path: 'assets/svgs/snow.svg', color: '#3B82F6' };
    if (code <= 82) return { path: 'assets/svgs/storm.svg', color: '#6366F1' };
    return { path: 'assets/svgs/thunderstorm.svg', color: '#6366F1' };
  });

}