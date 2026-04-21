import { Component, effect, input, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { SelectField } from '@shared/components/select-field/select-field';
import { NumberField } from '@shared/components/number-field/number-field';
import { SelectOption } from '@core/ui/types/select-option/select-option';
import { CreateInputRequest } from '@core/types/input/create-input.request';
import { UpdateInputRequest } from '@core/types/input/update-input-request';
import { UnitOfMeasure, UnitOfMeasureKey } from '@core/enums/unit-of-measure';
import { ToxicologicalClass, ToxicologicalClassKey } from '@core/enums/toxicological-class';
import { InputResponse } from '@core/types/input/input.response';
import { ICONS_ADMIN_INPUTS } from '@core/ui/icons/icons-admin/icons-admin-inputs/icons-admin-inputs';
@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FontAwesomeModule, 
    ButtonPages, 
    SelectField, 
    NumberField
  ],
  templateUrl: './input-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputForm {
  private readonly fb = inject(FormBuilder);

  readonly inputData      = input<InputResponse | null>(null);
  readonly saving         = input<boolean>(false);
  readonly categoryOptions = input<SelectOption[]>([]);
  readonly toCancel       = output<void>();
  readonly save           = output<CreateInputRequest | UpdateInputRequest>();

  readonly icons = ICONS_ADMIN_INPUTS;

  readonly unitOptions: SelectOption[] = Object.entries(UnitOfMeasure).map(([key, v]) => ({
    value: key,                                   
    label: `${v.description} (${v.abbreviation})` 
  }));
  
  readonly toxOptions: SelectOption[] = [
    { value: '', label: 'Nenhuma' },
    ...Object.entries(ToxicologicalClass).map(([key, obj]) => ({
      value: key,              
      label: obj.description   
    }))
  ];

  readonly form = this.fb.nonNullable.group({
    name:               ['', [Validators.required, Validators.maxLength(150)]],
    internalCode:       [''],
    manufacturerCode:   [''],
    description:        [''],
    unitOfMeasure:      ['' as UnitOfMeasureKey, Validators.required],
    activeIngredient:   [''],
    formulation:        [''],
    concentration:      [''],
    mapaRegistration:   [''],
    toxicologicalClass: ['' as ToxicologicalClassKey, Validators.required],
    gracePeriod:        [null as number | null],
    minimumStock:       [null as number | null],
    maximumStock:       [null as number | null],
    categoryId:         ['', Validators.required],
    controlled:         [false],
  });

  constructor() {
    effect(() => {
      const data = this.inputData();
      if (data) {
        this.form.patchValue({
          ...data,
          categoryId: data.categoryId,
          toxicologicalClass: data.toxicologicalClass ?? '',
        });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.save.emit(this.form.getRawValue() as CreateInputRequest);
  }
}