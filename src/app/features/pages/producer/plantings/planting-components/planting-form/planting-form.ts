import {
  Component, input, output, signal, computed,
  OnInit, inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlantingService } from '@core/services/planting.service';
import { SeasonService } from '@core/services/season.service';
import { PlantingResponse } from '@core/types/planting/planting.response';
import { SeasonResponse } from '@core/types/season/season-response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { NumberField } from '@shared/components/number-field/number-field';
import { ICONS_PLANTINGS } from '@core/ui/icons/icons-producer/icons-plantings/icons-plantings';

@Component({
  selector: 'app-planting-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FontAwesomeModule,
    ButtonPages,
    NumberField
  ],
  templateUrl: './planting-form.html',
})
export class PlantingForm implements OnInit {
  private readonly fb             = inject(FormBuilder);
  private readonly plantingService = inject(PlantingService);
  private readonly seasonService   = inject(SeasonService);

  propertyId      = input.required<string>();
  fieldId         = input.required<string>();
  fieldName       = input<string>('');
  cropVarietyId   = input.required<string>();
  cropVarietyName = input<string>('');
  cropName        = input<string>('');

  plantingData = input<PlantingResponse | null>(null);

  saved    = output<PlantingResponse>();
  toCancel = output<void>();

  saving        = signal(false);
  activeSeason  = signal<SeasonResponse | null>(null);
  seasonLoading = signal(true);
  seasonError   = signal(false);

  readonly icons = ICONS_PLANTINGS;

  readonly isEdit = computed(() => this.plantingData() != null);

  form = this.fb.group({
    areaHectares:        [null as number | null, [Validators.required, Validators.min(0.01)]],
    plantingDate:        ['', Validators.required],
    expectedHarvestDate: ['', Validators.required],
    cropVarietyId:       [''],
  });

  ngOnInit(): void {
    const d = this.plantingData();
    if (d) {
      this.form.patchValue({
        areaHectares:        d.areaHectares,
        plantingDate:        d.plantingDate,
        expectedHarvestDate: d.expectedHarvestDate,
        cropVarietyId:       d.cropVarietyId,
      });
      this.seasonLoading.set(false);
      return;
    }

    this.seasonService.findActiveSeason(this.propertyId()).subscribe({
      next: season => {
        this.activeSeason.set(season);
        this.seasonLoading.set(false);
      },
      error: () => {
        this.seasonError.set(true);
        this.seasonLoading.set(false);
      },
    });
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;

    const season = this.activeSeason();
    if (!this.isEdit() && !season) return;

    this.saving.set(true);
    const v = this.form.getRawValue();

    const req$ = this.isEdit()
      ? this.plantingService.updatePlanting(this.plantingData()!.id, {
          cropVarietyId:       v.cropVarietyId ?? undefined,
          plantingDate:        v.plantingDate ?? undefined,
          expectedHarvestDate: v.expectedHarvestDate ?? undefined,
        })
      : this.plantingService.createPlanting({
          propertyId:          this.propertyId(),
          fieldId:             this.fieldId(),
          seasonId:            season!.id,
          cropVarietyId:       this.cropVarietyId(),
          areaHectares:        v.areaHectares!,
          plantingDate:        v.plantingDate!,
          expectedHarvestDate: v.expectedHarvestDate!,
        });

    req$.subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}