import {
  Component, input, output, signal,
  inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgriculturalPracticeService } from '@core/services/agricultural-practice.service';
import { AgriculturalPracticeResponse } from '@core/types/agricultural-practice/agricultural-pratice.response';
import { PracticeType, PracticeTypeDesc } from '@core/enums/agricultural-practice-type';
import { UnitOfMeasure, UnitOfMeasureKey } from '@core/enums/unit-of-measure';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { SelectField } from '@shared/components/select-field/select-field';
import { NumberField } from '@shared/components/number-field/number-field';
import { ICONS_AGRICULTURAL_PRACTICES } from '@core/ui/icons/icons-producer/icons-agricultural-practices/icons-agricultural-practices';

@Component({
  selector: 'app-agricultural-practice-form',
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
  templateUrl: './agricultural-practice-form.html',
})
export class AgriculturalPracticeForm {
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(AgriculturalPracticeService);

  plantingId      = input.required<string>();
  cropVarietyName = input<string>('');
  cropName        = input<string>('');

  saved    = output<AgriculturalPracticeResponse>();
  toCancel = output<void>();

  saving = signal(false);

  readonly icons = ICONS_AGRICULTURAL_PRACTICES;

  readonly practiceOptions = Object.values(PracticeType).map(v => ({
    value: v, label: PracticeTypeDesc[v],
  }));

  readonly unitOptions = Object.keys(UnitOfMeasure).map(key => ({
    value: key,
    label: `${UnitOfMeasure[key as UnitOfMeasureKey].description} (${UnitOfMeasure[key as UnitOfMeasureKey].abbreviation})`,
  }));

  form = this.fb.group({
    practipeType:    [null as PracticeType | null, Validators.required],
    applicationDate: ['', Validators.required],
    productUsed:     ['', Validators.maxLength(200)],
    quantityUsed:    [null as number | null],
    unitOfMeasure:   [null as UnitOfMeasureKey | null],
    costAmount:      [null as number | null],
    observations:    [''],
  });

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();
    this.service.createPractice({
      plantingId:      this.plantingId(),
      practiceType:    v.practipeType!,
      applicationDate: v.applicationDate!,
      productUsed:     v.productUsed   ?? undefined,
      quantityUsed:    v.quantityUsed  ?? undefined,
      unitOfMeasure: v.unitOfMeasure ?? undefined,      costAmount:      v.costAmount    ?? undefined,
      observations:    v.observations  ?? undefined,
    }).subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}