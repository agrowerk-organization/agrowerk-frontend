import {
  Component, input, output, signal, computed,
  OnInit, inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { SelectField } from '@shared/components/select-field/select-field';
import { NumberField } from '@shared/components/number-field/number-field';
import { FieldService } from '@core/services/field.service';
import { FieldResponse } from '@core/types/field/field.response';
import { FieldStatus, FieldStatusDesc } from '@core/enums/field-status';
import { SoilType, SoilTypeDesc } from '@core/enums/soil-type';
import { ICONS_PRODUCER_FIELDS } from '@core/ui/icons/icons-producer/icons-field/icons-field';

@Component({
  selector: 'app-field-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonPages,
    SelectField,
    NumberField
  ],
  templateUrl: './field-form.html',
})
export class FieldForm implements OnInit {
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(FieldService);

  propertyId = input.required<string>();
  fieldData  = input<FieldResponse | null>(null);

  saved    = output<FieldResponse>();
  toCancel = output<void>();

  saving = signal(false);

  readonly icons = ICONS_PRODUCER_FIELDS;

  readonly soilOptions = Object.values(SoilType).map(v => ({
    value: v,
    label: SoilTypeDesc[v],
  }));

  readonly statusOptions = Object.values(FieldStatus)
    .filter(s => s !== FieldStatus.DEGRADED)
    .map(v => ({ value: v, label: FieldStatusDesc[v] }));

  readonly isEdit = computed(() => this.fieldData() != null);

  form = this.fb.group({
    name:            ['', [Validators.required, Validators.maxLength(100)]],
    code:            ['', Validators.maxLength(20)],
    areaHectares:    [null as number | null, [Validators.required, Validators.min(0.01)]],
    description:     [''],
    soilType:        [null as SoilType | null, Validators.required],
    fieldStatus:     [null as FieldStatus | null, Validators.required],
    slopePercentage: [null as number | null],
    notes:           [''],
    latitude:        [null as number | null],
    longitude:       [null as number | null],
  });

  ngOnInit(): void {
    const d = this.fieldData();
    if (d) {
      this.form.patchValue({
        name:            d.name,
        code:            d.code,
        description:     d.description,
        soilType:        d.soilType as SoilType,
        fieldStatus:     d.fieldStatus as FieldStatus,
        slopePercentage: d.slopePercentage,
        notes:           d.notes,
        latitude:        d.latitude,
        longitude:       d.longitude,
      });
      // área não é editável
      this.form.get('areaHectares')?.disable();
      this.form.get('code')?.disable();
    }
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();

    const req$ = this.isEdit()
      ? this.service.updateField(this.fieldData()!.id, {
          name:            v.name ?? undefined,
          description:     v.description ?? undefined,
          soilType:        v.soilType ?? undefined,
          fieldStatus:     v.fieldStatus ?? undefined,
          slopePercentage: v.slopePercentage ?? undefined,
          notes:           v.notes ?? undefined,
          latitude:        v.latitude ?? undefined,
          longitude:       v.longitude ?? undefined,
        })
      : this.service.createField({
          propertyId:      this.propertyId(),
          name:            v.name!,
          code:            v.code ?? undefined,
          areaHectares:    v.areaHectares!,
          description:     v.description ?? undefined,
          soilType:        v.soilType!,
          fieldStatus:     v.fieldStatus!,
          slopePercentage: v.slopePercentage ?? undefined,
          notes:           v.notes ?? undefined,
          latitude:        v.latitude ?? undefined,
          longitude:       v.longitude ?? undefined,
        });

    req$.subscribe({
      next:  res  => { this.saving.set(false); this.saved.emit(res); },
      error: ()   => this.saving.set(false),
    });
  }
}