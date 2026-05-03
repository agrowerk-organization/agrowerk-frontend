import {
  Component, input, output, signal, OnInit,
  inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { NumberField } from '@shared/components/number-field/number-field';
import { SelectField } from '@shared/components/select-field/select-field';
import { PlantingInputService } from '@core/services/planting-input.service';
import { PlantingInputResponse } from '@core/types/planting-input/planting-input.response';
import { InputService } from '@core/services/input.service';
import { InputResponse }         from '@core/types/input/input.response';
import { UnitOfMeasure, UnitOfMeasureKey } from '@core/enums/unit-of-measure';
import { ICONS_PLANTING_INPUTS } from '@core/ui/icons/icons-producer/icons-planting-inputs/icons-planting-inputs';

@Component({
  selector: 'app-planting-input-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FontAwesomeModule,
    ButtonPages,
    NumberField, 
    SelectField,
  ],
  templateUrl: './planting-input-form.html',
})
export class PlantingInputForm implements OnInit {
  private readonly fb             = inject(FormBuilder);
  private readonly service        = inject(PlantingInputService);
  private readonly inputService   = inject(InputService);

  plantingId = input.required<string>();
  saved      = output<PlantingInputResponse>();
  toCancel   = output<void>();

  saving         = signal(false);
  inputs         = signal<InputResponse[]>([]);
  selectedInput  = signal<InputResponse | null>(null);
  pickerOpen     = signal(false);

  readonly icons = ICONS_PLANTING_INPUTS;

  readonly unitOptions = Object.keys(UnitOfMeasure).map(key => ({
    value: key,
    label: `${UnitOfMeasure[key as UnitOfMeasureKey].description} (${UnitOfMeasure[key as UnitOfMeasureKey].abbreviation})`,
  }));

  form = this.fb.group({
    inputId:         ['', Validators.required],
    unitOfMeasure:   [null as UnitOfMeasureKey | null, Validators.required],
    quantity:        [null as number | null, [Validators.required, Validators.min(0.001)]],
    applicationDate: ['', Validators.required],
  });

  ngOnInit(): void {
    this.inputService.findCatalog({ page: 0, size: 100 }).subscribe({
      next: page => this.inputs.set(page.content ?? []),
    });
  }

  selectInput(input: InputResponse): void {
    this.selectedInput.set(input);
    this.form.get('inputId')?.setValue(input.id);
    this.pickerOpen.set(false);
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();

    this.service.createPlantingInput({
      plantingId:      this.plantingId(),
      inputId:         v.inputId!,
      unitOfMeasure:   v.unitOfMeasure!,
      quantity:        v.quantity!,
      applicationDate: v.applicationDate!,
    }).subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}