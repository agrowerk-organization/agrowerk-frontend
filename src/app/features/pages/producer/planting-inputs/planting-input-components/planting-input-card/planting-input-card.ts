import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlantingInputResponse } from '@core/types/planting-input/planting-input.response';
import { UnitOfMeasure }         from '@core/enums/unit-of-measure';
import { ICONS_PLANTING_INPUTS } from '@core/ui/icons/icons-producer/icons-planting-inputs/icons-planting-inputs';

@Component({
  selector: 'app-planting-input-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './planting-input-card.html',
})
export class PlantingInputCard {
  plantingInput = input.required<PlantingInputResponse>();

  readonly icons = ICONS_PLANTING_INPUTS;

  get unitInfo() {
    const key = this.plantingInput().measureUnit as keyof typeof UnitOfMeasure;
    return UnitOfMeasure[key] ?? { abbreviation: this.plantingInput().measureUnit, description: this.plantingInput().measureUnit };
  }
}