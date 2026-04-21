import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { catchError, of } from 'rxjs';
import { WeatherService } from '@core/services/weather.service';
import { WeatherAlertService } from '@core/services/weather-alert.service';
import { PropertyService } from '@core/services/property.service';
import { PropertyResponse } from '@core/types/property/property.response';
import { WeatherDashboard } from '@core/types/weather/weather-dashboard';
import { ICONS_WEATHER } from '@core/ui/icons/icons-producer/icons-weather/icons-weather';
import { WeatherCard } from './weather-components/weather-card/weather-card';
import { ForecastCard } from './weather-components/forecast-card/forecast-card';
import { StatisticsCard } from './weather-components/statistics-card/statistics-card';
import { WeatherAlertsCard } from './weather-components/weather-alerts-card/weather-alerts-card';
import { PropertySelector } from '../dashboard/dashboard-components/property-selector/property-selector';
import { Alert } from '@core/types/weather/alert';
import { ResolveAlertModal } from './weather-components/resolve-alert-modal/resolve-alert-modal';
import { BackButton } from "@shared/components/back-button/back-button";

@Component({
  selector: 'app-weather',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    WeatherCard,
    ForecastCard,
    StatisticsCard,
    WeatherAlertsCard,
    ResolveAlertModal,
    PropertySelector,
    BackButton
],
  templateUrl: './weather.html'
})
export class Weather implements OnInit {
  private weatherService = inject(WeatherService);
  private weatherAlertService = inject(WeatherAlertService);
  private propertyService = inject(PropertyService);

  icons = ICONS_WEATHER;
  
  locationId = signal<string | null>(null);
  loading = signal(true);
  properties = signal<PropertyResponse[]>([]);
  activeProperty = signal<PropertyResponse | null>(null);
  weatherDashboard = signal<WeatherDashboard | null>(null);
  resolvingAlert = signal<Alert | null>(null);

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loading.set(true);
    this.propertyService.findMyProperties().subscribe({
      next: (page) => {
        const props = page.content ?? [];
        this.properties.set(props);
        
        if (props.length > 0) {
          const target = props[props.length - 1];
          this.activeProperty.set(target);
          this.loadWeatherData(target.id);
        } else {
          this.loading.set(false);
        }
      },
      error: () => this.loading.set(false)
    });
  }

  loadWeatherData(propertyId: string) {
    this.weatherService.getLocationByProperty(propertyId)
      .pipe(catchError(() => of(null)))
      .subscribe(location => {
        if (location) {
          this.locationId.set(location.id);
          this.weatherService.getDashboard(location.id).subscribe({
            next: (data) => {
              this.weatherDashboard.set(data);
              this.loading.set(false);
              this.weatherDashboard.set(data);
              this.loading.set(false);
            },
            error: () => this.loading.set(false)
          });
        } else {
          this.weatherDashboard.set(null);
          this.loading.set(false);
        }
      });
  }

  onPropertyChange(propertyId: string) {
    const prop = this.properties().find(p => p.id === propertyId);
    if (prop) {
      this.loading.set(true);
      this.activeProperty.set(prop);
      this.loadWeatherData(propertyId);
    }
  }

  onAlertResolved(): void {
    const resolved = this.resolvingAlert();
    this.resolvingAlert.set(null);

    const current = this.weatherDashboard();

    if (!current || !resolved) return;

    this.weatherDashboard.set({
      ...current,
      activeAlerts: (current.activeAlerts ?? []).filter(a => a.id !== resolved.id)
    });
  }

  onResolveAlert(alert: Alert): void {
    this.resolvingAlert.set(alert);
  }
}