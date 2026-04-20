import { Component, computed, input, signal, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecast } from '@core/types/weather/weather-forecast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_WEATHER } from '@core/ui/icons/icons-producer/icons-weather/icons-weather';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './forecast-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastCard {
  forecast = input<WeatherForecast[]>([]);
  readonly selectedDay = signal<WeatherForecast | null>(null);
  readonly days = computed(() => this.forecast() ?? []);
  
  hasForecast = computed(() => this.forecast().length > 0);

  icons = ICONS_WEATHER;

  getIconPath = computed(() => {
    const code = this.forecast()?.[0]?.weatherCode ?? -1;
    return this.getWeatherConfig(code);
  });

  getWeatherByCode(code: number) {
    return this.getWeatherConfig(code);
  }

  constructor() {
    effect(() => {
      const first = this.days()[0] ?? null;
      this.selectedDay.set(first);
    })
  } 
  
  selectDay(day: WeatherForecast): void {
    this.selectedDay.set(day);
  }

  private getWeatherConfig(code: number) {
    if (code === 0)  return { path: 'assets/svgs/sunny.svg',        color: '#F59E0B', label: 'Céu Limpo'            };
    if (code <= 3)   return { path: 'assets/svgs/partly-cloud.svg', color: '#6EE7B7', label: 'Parcialmente Nublado' };
    if (code <= 48)  return { path: 'assets/svgs/foggy.svg',        color: '#A3B8A3', label: 'Nublado'              };
    if (code <= 67)  return { path: 'assets/svgs/rainy.svg',        color: '#38BDF8', label: 'Chuva'                };
    if (code <= 77)  return { path: 'assets/svgs/snowy.svg',        color: '#BAE6FD', label: 'Neve'                 };
    if (code <= 82)  return { path: 'assets/svgs/showers.svg',      color: '#818CF8', label: 'Pancadas'             };
    return             { path: 'assets/svgs/thunderstorm.svg',      color: '#C084FC', label: 'Tempestade'           };
  }
}