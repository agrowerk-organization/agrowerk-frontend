import {
  Component, input, output, signal, computed,
  OnInit, inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WarehouseService } from '@core/services/warehouse.service';
import { WarehouseResponse } from '@core/types/warehouse/warehouse.response';
import { WarehouseType, WarehouseTypeDesc } from '@core/enums/warehouse-type';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { NumberField } from '@shared/components/number-field/number-field';
import { SelectField } from '@shared/components/select-field/select-field';
import { ICONS_WAREHOUSE } from '@core/ui/icons/icons-producer/icons-warehouse/icons-warehouse';

@Component({
  selector: 'app-warehouse-form',
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
  templateUrl: './warehouse-form.html',
})
export class WarehouseForm implements OnInit {
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(WarehouseService);

  propertyId    = input.required<string>();
  warehouseData = input<WarehouseResponse | null>(null);
  saved         = output<WarehouseResponse>();
  toCancel      = output<void>();

  saving = signal(false);

  readonly icons = ICONS_WAREHOUSE;

  readonly typeOptions = Object.values(WarehouseType).map(v => ({
    value: v, label: WarehouseTypeDesc[v],
  }));

  readonly isEdit = computed(() => this.warehouseData() != null);

  form = this.fb.group({
    name:          ['', [Validators.required, Validators.maxLength(100)]],
    code:          ['', Validators.maxLength(20)],
    warehouseType: [null as WarehouseType | null, Validators.required],
    capacityKg:    [null as number | null],
    location:      ['', Validators.maxLength(200)],
    description:   [''],
  });

  ngOnInit(): void {
    const d = this.warehouseData();
    if (d) {
      this.form.patchValue({
        name:          d.name,
        code:          d.code,
        warehouseType: d.warehouseType as WarehouseType,
        capacityKg:    d.capacityKg,
        location:      d.location,
        description:   d.description,
      });
    }
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();

    const req$ = this.isEdit()
      ? this.service.updateWarehouse(this.warehouseData()!.id, {
          name:          v.name          ?? undefined,
          code:          v.code          ?? undefined,
          warehouseType: v.warehouseType ?? undefined,
          capacityKg:    v.capacityKg    ?? undefined,
          location:      v.location      ?? undefined,
          description:   v.description   ?? undefined,
        })
      : this.service.createWarehouse({
          propertyId:    this.propertyId(),
          name:          v.name!,
          code:          v.code          ?? undefined,
          warehouseType: v.warehouseType!,
          capacityKg:    v.capacityKg    ?? undefined,
          location:      v.location      ?? undefined,
          description:   v.description   ?? undefined,
        });

    req$.subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}