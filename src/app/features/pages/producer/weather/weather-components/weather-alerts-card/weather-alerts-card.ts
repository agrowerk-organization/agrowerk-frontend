import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  input,
  output
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Alert } from '@core/types/weather/alert';
import { ICONS_WEATHER } from '@core/ui/icons/icons-producer/icons-weather/icons-weather';
import { ButtonPages } from "@shared/components/buttons/button-pages/button-pages";
import { Badge } from "@shared/components/badge/badge";
import { BadgeIndex } from '@core/ui/types/badge/badge';
@Component({
  selector: 'app-weather-alerts-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, ButtonPages, Badge],
  providers: [DatePipe],
  templateUrl: './weather-alerts-card.html'
})
export class WeatherAlertsCard {

  readonly alerts    = input.required<Alert[] | null>();
  readonly canResolve = input<boolean>(false);
  readonly resolve   = output<Alert>();

  readonly icons = ICONS_WEATHER;

  readonly hasAlerts = computed(() => (this.alerts() ?? []).length > 0);
  readonly alertCount = computed(() => (this.alerts() ?? []).length);

  private readonly datePipe = inject(DatePipe);

  readonly alertsWithBadges = computed(() => {
    return (this.alerts() ?? []).map(alert => {
      const formattedDate = this.datePipe.transform(alert.createdAt, 'dd/MM/yyyy HH:mm') ?? 'Data Indisponível';
      
      const dateBadge: BadgeIndex = {
        icon: this.icons.CLOCK,
        text: formattedDate
      };

      return {
        ...alert,
        dateBadge: [dateBadge] 
      };
    });
  });

  onResolve(alert: Alert): void {
    this.resolve.emit(alert);
  }

  formatActions(actions: string): string[] {
    if (!actions) return [];
    return actions
      .split('•')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }
 }