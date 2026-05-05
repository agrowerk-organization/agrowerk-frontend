import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlantingResponse }   from '@core/types/planting/planting.response';
import { PlantingStatus, PlantingStatusDesc, PlantingStatusColor } from '@core/enums/planting-status';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_PLANTINGS } from '@core/ui/icons/icons-producer/icons-plantings/icons-plantings';
@Component({
  selector: 'app-planting-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './planting-card.html',
})
export class PlantingCard {
  planting = input.required<PlantingResponse>();
  edit     = output<PlantingResponse>();
  toCancel   = output<PlantingResponse>();
  inputs   = output<PlantingResponse>();
  forecast = output<PlantingResponse>();
  prescription = output<PlantingResponse>();
  harvest      = output<PlantingResponse>();


  readonly icons = ICONS_PLANTINGS;

  statusLabel = computed(() =>
    PlantingStatusDesc[this.planting().plantingStatus as PlantingStatus] ?? this.planting().plantingStatus
  );

  statusColor = computed(() =>
    PlantingStatusColor[this.planting().plantingStatus as PlantingStatus] ?? 'text-primary border-primary'
  );

  canEdit = computed(() =>
    this.planting().plantingStatus === PlantingStatus.PENDING ||
    this.planting().plantingStatus === PlantingStatus.IN_PROGRESS
  );

  canCancel = computed(() =>
    this.planting().plantingStatus === PlantingStatus.PENDING ||
    this.planting().plantingStatus === PlantingStatus.IN_PROGRESS
  );
}