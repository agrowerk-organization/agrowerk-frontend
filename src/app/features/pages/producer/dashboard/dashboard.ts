import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { forkJoin, catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
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
import { LayoutStateService } from '../../../../core/services/layout-state.service';

import { Cycle } from '../../../../core/ui/types/cycle/cycle';
import { CycleDiagram } from '../../../../shared/components/cycle-diagram/cycle-diagram';

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
    OnboardingCard,
    CycleDiagram
  ],
  templateUrl: './dashboard.html'
})
export class ProducerDashboard implements OnInit {
  private weatherService = inject(WeatherService);
  private propertyService = inject(PropertyService);
  private seasonService = inject(SeasonService);
  private authService = inject(AuthService);
  private router = inject(Router);

  layoutState = inject(LayoutStateService);


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

  cycleNodes: Cycle[] = [
    {
      id: 1,
      label: 'Plantio',
      route: '/producer/plantings',
      description: 'Registre o início da safra e vincule insumos',
      color: '#66BB6A',
      angle: 0,
      metrics: []
    },
    {
      id: 2,
      label: 'Manejo',
      route: '/producer/fields',
      description: 'Controle aplicações e monitoramento',
      color: '#81C784',
      angle: 60,
      metrics: []
    },
    {
      id: 3,
      label: 'Colheita',
      route: '/producer/harvests',
      description: 'Rastreie a produção por lote',
      color: '#FFB74D',
      angle: 120,
      metrics: []
    },
    {
      id: 4,
      label: 'Estoque',
      route: '/producer/stock',
      description: 'Monitore a produção colhida',
      color: '#FF9800',
      angle: 180,
      metrics: []
    },
    {
      id: 5,
      label: 'Negociação',
      route: '/producer/barter',
      description: 'Marketplace barter',
      color: '#F57C00',
      angle: 240,
      metrics: []
    },
    {
      id: 6,
      label: 'Planejamento',
      route: '/producer/seasons',
      description: 'Calendário e metas de produção',
      color: '#4CAF50',
      angle: 300,
      metrics: []
    }
  ];

  activeNodeId = computed(() => {
    const url = this.router.url;
    const map: Record<string, number> = {
      '/producer/plantings': 1,
      '/producer/fields': 2,
      '/producer/harvests': 3,
      '/producer/stock': 4,
      '/producer/barter': 5,
      '/producer/seasons': 6
    };
    return Object.entries(map)
      .find(([path]) => url.includes(path))?.[1] ?? null;
  });
  
  onNodeNavigate(route: string): void {
    this.router.navigate([route]);
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