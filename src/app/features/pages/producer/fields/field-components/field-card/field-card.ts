import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FieldResponse } from '@core/types/field/field.response';
import { FieldStatus, FieldStatusDesc, FieldStatusColor } from '@core/enums/field-status';
import { SoilType, SoilTypeDesc } from '@core/enums/soil-type';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_PRODUCER_FIELDS } from '@core/ui/icons/icons-producer/icons-field/icons-field';

@Component({
  selector: 'app-field-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './field-card.html',
})
export class FieldCard {
  field = input.required<FieldResponse>();
  edit  = output<FieldResponse>();
  newPlanting = output<FieldResponse>();

  readonly icons = ICONS_PRODUCER_FIELDS;

  statusLabel = computed(() =>
    FieldStatusDesc[this.field().fieldStatus as FieldStatus] ?? this.field().fieldStatus
  );

  statusColor = computed(() =>
    FieldStatusColor[this.field().fieldStatus as FieldStatus] ?? 'text-primary border-primary'
  );

  soilLabel = computed(() =>
    SoilTypeDesc[this.field().soilType as SoilType] ?? this.field().soilType
  );

  hasLocation = computed(() =>
    this.field().latitude != null && this.field().longitude != null
  );
}