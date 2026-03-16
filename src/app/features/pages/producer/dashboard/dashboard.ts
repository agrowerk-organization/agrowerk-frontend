import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { forkJoin, catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../core/services/auth.service';
import { PropertyService } from '../../../../core/services/property.service';
import { WeatherService } from '../../../../core/services/weather.service';
import { SeasonService } from '../../../../core/services/season.service';
import { PropertyResponse } from '../../../../core/types/property/property.response';
import { WeatherDashboard } from '../../../../core/types/weather/weather-dashboard';
import { SeasonResponse } from '../../../../core/types/season/season-response';
import { WelcomeBanner } from './dashboard-components/welcome-banner/welcome-banner';
import { PropertySelector } from './dashboard-components/property-selector/property-selector';
import { WeatherCard } from './dashboard-components/weather-card/weather-card';
import { SeasonCard } from './dashboard-components/season-card/season-card';
import { ForecastCard } from './dashboard-components/forecast-card/forecast-card';
import { AlertsCard } from './dashboard-components/alerts-card/alerts-card';
import { OnboardingCard } from './dashboard-components/onboarding-card/onboarding-card';

@Component({
  selector: 'app-producer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    WelcomeBanner,
    PropertySelector,
    WeatherCard,
    SeasonCard,
    ForecastCard,
    AlertsCard,
    OnboardingCard
  ],
  templateUrl: './dashboard.html'
})
export class ProducerDashboard implements OnInit {
  private weatherService = inject(WeatherService);
  private propertyService = inject(PropertyService);
  private seasonService = inject(SeasonService);
  private authService = inject(AuthService);

  loading = signal(true);
  currentUser = toSignal(this.authService.currentUser$);
  properties = signal<PropertyResponse[]>([]);
  activeProperty = signal<PropertyResponse | null>(null);
  weatherDashboard = signal<WeatherDashboard | null>(null);
  activeSeason = signal<SeasonResponse | null>(null);

  hasProperty = computed(() => this.properties().length > 0);

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading.set(true);
    this.propertyService.findMyProperties().subscribe({
      next: (page) => {
        const props = page.content;
        this.properties.set(props);
        if (props.length === 0) {
          this.loading.set(false);
          return;
        }
        const latest = props[props.length - 1];
        this.activeProperty.set(latest);
        this.loadPropertyData(latest.id);
      },
      error: () => this.loading.set(false)
    });
  }

  loadPropertyData(propertyId: string) {
    forkJoin({
      location: this.weatherService
        .getLocationByProperty(propertyId)
        .pipe(catchError(() => of(null))),
      seasons: this.seasonService
        .findMySeasons(propertyId)
        .pipe(catchError(() => of([])))
    }).subscribe(({ location, seasons }) => {
      this.activeSeason.set(
        seasons.find((s: SeasonResponse) =>
          s.seasonStatus === 'ACTIVE') ?? null
      );

      if (location) {
        this.weatherService.getDashboard(location.id).subscribe({
          next: (d) => {
            this.weatherDashboard.set(d);
            this.loading.set(false);
          },
          error: () => this.loading.set(false)
        });
      } else {
        this.loading.set(false);
      }
    });
  }

  onPropertyChange(propertyId: string) {
    const prop = this.properties().find(p => p.id === propertyId);
    if (prop) {
      this.activeProperty.set(prop);
      this.loadPropertyData(propertyId);
    }
  }
}