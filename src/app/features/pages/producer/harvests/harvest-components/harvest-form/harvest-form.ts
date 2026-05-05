import {
  Component, input, output, signal,
  inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HarvestService } from '@core/services/harvest.service';
import { HarvestResponse } from '@core/types/harvest/harvest.response';
import { ButtonPages  }  from '@shared/components/buttons/button-pages/button-pages';
import { NumberField } from '@shared/components/number-field/number-field';
import { ICONS_HARVEST } from '@core/ui/icons/icons-producer/icons-harvest/icons-harvest';

@Component({
  selector: 'app-harvest-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FontAwesomeModule, 
    ButtonPages, 
    NumberField
  ],
  templateUrl: './harvest-form.html',
})
export class HarvestForm {
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(HarvestService);

  plantingId      = input.required<string>();
  cropVarietyName = input<string>('');
  cropName        = input<string>('');

  saved    = output<HarvestResponse>();
  toCancel = output<void>();

  saving = signal(false);

  readonly icons = ICONS_HARVEST;
  
  form = this.fb.group({
    harvestDate:  ['', Validators.required],
    quantityKg:   [null as number | null, [Validators.required, Validators.min(0.001)]],
    qualityGrade: [''],
  });

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();
    this.service.createHarvest({
      plantingId:   this.plantingId(),
      harvestDate:  v.harvestDate!,
      quantityKg:   v.quantityKg!,
      qualityGrade: v.qualityGrade ?? undefined,
    }).subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}