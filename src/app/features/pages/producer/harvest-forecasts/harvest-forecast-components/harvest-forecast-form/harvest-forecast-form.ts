import {
  Component, input, output, signal, computed,
  OnInit, inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { NumberField } from '@shared/components/number-field/number-field';
import { SelectField } from '@shared/components/select-field/select-field';
import { HarvestForecastService }     from '@core/services/harvest-forecast.service';
import { HarvestForecastResponse } from '@core/types/harvest-forecast/harvest-forecast.response';
import { ConfidenceLevel, ConfidenceLevelDesc } from '@core/enums/confidence-level';
import { ICONS_HARVEST_FORECASTS } from '@core/ui/icons/icons-producer/icons-harvest-forecasts/icons-harvest-forecasts';

@Component({
  selector: 'app-harvest-forecast-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FontAwesomeModule,
    ButtonPages,
    NumberField, 
    SelectField
  ],
  templateUrl: './harvest-forecast-form.html',
})
export class HarvestForecastForm implements OnInit {
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(HarvestForecastService);

  plantingId     = input.required<string>();
  forecastData   = input<HarvestForecastResponse | null>(null);
  cropVarietyName = input<string>('');
  cropName        = input<string>('');

  saved    = output<HarvestForecastResponse>();
  toCancel = output<void>();

  saving = signal(false);

  readonly icons = ICONS_HARVEST_FORECASTS;

  readonly confidenceOptions = Object.values(ConfidenceLevel).map(v => ({
    value: v,
    label: ConfidenceLevelDesc[v],
  }));

  readonly isEdit = computed(() => this.forecastData() != null);

  form = this.fb.group({
    estimatedQuantity: [null as number | null, [Validators.required, Validators.min(0.001)]],
    forecastDate:      ['', Validators.required],
    confidenceLevel:   [null as ConfidenceLevel | null, Validators.required],
    plantedArea:       [null as number | null],
    notes:             [''],
  });

  ngOnInit(): void {
    const d = this.forecastData();
    if (d) {
      this.form.patchValue({
        estimatedQuantity: d.estimatedQuantity,
        forecastDate:      d.forecastDate,
        confidenceLevel:   d.confidenceLevel as ConfidenceLevel,
        plantedArea:       d.plantedArea,
        notes:             d.notes,
      });
    }
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();

    const req$ = this.isEdit()
      ? this.service.updateForecast(this.forecastData()!.id, {
          estimatedQuantity: v.estimatedQuantity ?? undefined,
          forecastDate:      v.forecastDate ?? undefined,
          confidenceLevel:   v.confidenceLevel ?? undefined,
          plantedArea:       v.plantedArea ?? undefined,
          notes:             v.notes ?? undefined,
        })
      : this.service.createForecast({
          plantingId:        this.plantingId(),
          estimatedQuantity: v.estimatedQuantity!,
          forecastDate:      v.forecastDate!,
          confidenceLevel:   v.confidenceLevel!,
          plantedArea:       v.plantedArea ?? undefined,
          notes:             v.notes ?? undefined,
        });

    req$.subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}
