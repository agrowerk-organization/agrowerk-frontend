import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';
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
    if (code === 0)  return { path: 'assets/svgs/sunny.svg',        color: '#F59E0B' };
    if (code <= 3)   return { path: 'assets/svgs/partly-cloud.svg', color: '#6EE7B7' };
    if (code <= 48)  return { path: 'assets/svgs/foggy.svg',        color: '#A3B8A3' };
    if (code <= 67)  return { path: 'assets/svgs/rainy.svg',        color: '#38BDF8' };
    if (code <= 77)  return { path: 'assets/svgs/snowy.svg',        color: '#BAE6FD' };
    if (code <= 82)  return { path: 'assets/svgs/showers.svg',      color: '#818CF8' };
    return             { path: 'assets/svgs/thunderstorm.svg',      color: '#C084FC' };
  });
}