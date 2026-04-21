import { Component, effect, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateInputCategoryRequest } from '@core/types/input/create-input-category.request';
import { UpdateInputCategoryRequest } from '@core/types/input/update-input-category.request';
import { InputCategoryResponse } from '@core/types/input/input-category.response';
import { UnitOfMeasure } from '@core/enums/unit-of-measure';
import { HazardLevel } from '@core/enums/hazard-level';
import { SelectOption } from '@core/ui/types/select-option/select-option';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { SelectField } from '@shared/components/select-field/select-field';
import { ICONS_ADMIN_INPUTS } from '@core/ui/icons/icons-admin/icons-admin-inputs/icons-admin-inputs';
@Component({
  selector: 'app-input-category-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FontAwesomeModule, 
    ButtonPages, 
    SelectField  
  ],
  templateUrl: './input-category-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCategoryForm {
  private readonly fb = inject(FormBuilder);

  readonly categoryData  = input<InputCategoryResponse | null>(null);
  readonly saving        = input<boolean>(false);
  readonly parentOptions = input<SelectOption[]>([]);
  readonly toCancel      = output<void>();
  readonly save          = output<CreateInputCategoryRequest | UpdateInputCategoryRequest>();

  readonly icons = ICONS_ADMIN_INPUTS;

  readonly unitOptions: SelectOption[] = Object.entries(UnitOfMeasure).map(([key, v]) => ({
    value: key,                                   
    label: `${v.description} (${v.abbreviation})` 
  }));

  readonly hazardOptions: SelectOption[] = Object.entries(HazardLevel).map(([key, value]) => ({
    value: key,         
    label: value.label   
  }));

  readonly form = this.fb.nonNullable.group({
    name:         ['', [Validators.required, Validators.maxLength(100)]],
    description:  [''],
    unitOfMeasure: ['' as keyof typeof UnitOfMeasure, Validators.required],
    icon:         [''],
    color:        ['#4CAF50'],
    hazardLevel:  ['' as keyof typeof HazardLevel, Validators.required],
    parentId:     ['' as string | null],
  });

  constructor() {
    effect(() => {
      const data = this.categoryData();
      if (data) {
        this.form.patchValue({
          name: data.name,
          description: data.description,
          unitOfMeasure: data.unitOfMeasure as keyof typeof UnitOfMeasure,
          icon: data.icon,
          color: data.color,
          hazardLevel: data.hazardLevel as keyof typeof HazardLevel,
          parentId: data.parentId,
        });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const raw = this.form.getRawValue();
    this.save.emit({
      ...raw,
      parentId: raw.parentId || undefined,
    } as CreateInputCategoryRequest);
  }
}
