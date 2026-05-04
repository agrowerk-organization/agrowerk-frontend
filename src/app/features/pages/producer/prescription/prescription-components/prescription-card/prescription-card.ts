import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrescriptionResponse } from '@core/types/prescription/prescription.response';
import { UnitOfMeasure } from '@core/enums/unit-of-measure';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_PRESCRIPTIONS } from '@core/ui/icons/icons-producer/icons-prescriptions/icons-prescription';

@Component({
  selector: 'app-prescription-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './prescription-card.html',
})
export class PrescriptionCard {
  prescription = input.required<PrescriptionResponse>();
  deactivate   = output<PrescriptionResponse>();

  readonly icons = ICONS_PRESCRIPTIONS;
  canDeactivate = computed(() => !!this.prescription().active && !this.prescription().expired);

  unitLabel(unit: string): string {
    const info = UnitOfMeasure[unit as keyof typeof UnitOfMeasure];
    return info ? `${info.description} (${info.abbreviation})` : unit;
  }
}