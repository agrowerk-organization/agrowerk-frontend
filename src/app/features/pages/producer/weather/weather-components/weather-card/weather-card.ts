import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { map } from 'rxjs';
import { ICONS_DASHBOARD } from '@core/ui/icons/icons-producer/icons-dashboard/icons-dashboard';
import { WeatherCurrent } from '@core/types/weather/weather-current';
import { ButtonPages } from "@shared/components/buttons/button-pages/button-pages";
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './weather-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCard {
  private router = inject(Router);

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

  goToWeather() {
    this.router.navigate(['producer/weather']);
  }

  readonly isDashboard = toSignal(
    this.router.events.pipe(
      map(() => this.router.url === '/producer/dashboard')),
      { initialValue: this.router.url === '/producer/dashboard' }
  );
}