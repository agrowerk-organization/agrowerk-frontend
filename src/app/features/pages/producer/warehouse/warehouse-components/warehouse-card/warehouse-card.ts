import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WarehouseResponse } from '@core/types/warehouse/warehouse.response';
import { WarehouseType, WarehouseTypeDesc } from '@core/enums/warehouse-type';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_WAREHOUSE } from '@core/ui/icons/icons-producer/icons-warehouse/icons-warehouse';
@Component({
  selector: 'app-warehouse-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './warehouse-card.html',
})
export class WarehouseCard {
  warehouse  = input.required<WarehouseResponse>();
  edit       = output<WarehouseResponse>();
  deactivate = output<WarehouseResponse>();

  readonly icons = ICONS_WAREHOUSE;

  typeLabel = computed(() =>
    WarehouseTypeDesc[this.warehouse().warehouseType as WarehouseType] ?? this.warehouse().warehouseType
  );

  occupancyRatio = computed(() => {
    const cap = this.warehouse().capacityKg;
    if (!cap) return 0;
    return Math.min((this.warehouse().currentOccupancyKg / cap) * 100, 100);
  });

  occupancyColor = computed(() => {
    const r = this.occupancyRatio();
    if (r >= 90) return 'bg-red-400';
    if (r >= 70) return 'bg-amber-400';
    return 'bg-primary';
  });
}