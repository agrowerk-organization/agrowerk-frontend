import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { HarvestForecastResponse } from '@core/types/harvest-forecast/harvest-forecast.response';
import { ConfidenceLevel, ConfidenceLevelDesc, ConfidenceLevelColor } from '@core/enums/confidence-level';
import { ICONS_HARVEST_FORECASTS } from '@core/ui/icons/icons-producer/icons-harvest-forecasts/icons-harvest-forecasts';

@Component({
  selector: 'app-harvest-forecast-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './harvest-forecast-card.html',
})
export class HarvestForecastCard {
  forecast = input.required<HarvestForecastResponse>();
  edit     = output<HarvestForecastResponse>();

  readonly icons = ICONS_HARVEST_FORECASTS;

  confidenceLabel = computed(() =>
    ConfidenceLevelDesc[this.forecast().confidenceLevel as ConfidenceLevel] ?? this.forecast().confidenceLevel
  );

  confidenceColor = computed(() =>
    ConfidenceLevelColor[this.forecast().confidenceLevel as ConfidenceLevel] ?? 'text-primary border-primary'
  );

  hasActual = computed(() => this.forecast().actualQuantityKg != null && (this.forecast().actualQuantityKg || 0) > 0);

  availableRatio = computed(() => {
    const est = this.forecast().estimatedQuantity;
    if (!est) return 0;
    return Math.min((this.forecast().availableQuantity / est) * 100, 100);
  });
}