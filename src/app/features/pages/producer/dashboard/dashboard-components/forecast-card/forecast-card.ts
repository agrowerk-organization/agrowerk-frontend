import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { WeatherForecast } from '../../../../../../core/types/weather/weather-forecast';
@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastCard {
  forecast = input<WeatherForecast[]>([]);

  days = computed(() => this.forecast().slice(0, 7));
  hasForecast = computed(() => this.forecast().length > 0);

  getIconPath = computed(() => {
    const code = this.forecast()?.[0]?.weatherCode ?? -1;
    return this.getWeatherConfig(code);
  });

  getWeatherByCode(code: number) {
    return this.getWeatherConfig(code);
  }

  private getWeatherConfig(code: number) {
    if (code === 0) return { path: 'assets/svgs/sunny.svg', color: '#FFB900', label: 'Céu Limpo' };
    if (code <= 3) return { path: 'assets/svgs/partly-cloudy.svg', color: '#94A3B8', label: 'Parcialmente Nublado' };
    if (code <= 48) return { path: 'assets/svgs/cloudy.svg', color: '#94A3B8', label: 'Nublado' };
    if (code <= 67) return { path: 'assets/svgs/rain.svg', color: '#3B82F6', label: 'Chuva' };
    if (code <= 77) return { path: 'assets/svgs/snow.svg', color: '#0EA5E9', label: 'Neve' };
    if (code <= 82) return { path: 'assets/svgs/storm.svg', color: '#6366F1', label: 'Pancadas' };
    
    return { path: 'assets/svgs/thunderstorm.svg', color: '#4F46E5', label: 'Tempestade' };
  }
}
