import { Component, computed, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputCategoryResponse } from '@core/types/input/input-category.response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { UnitOfMeasure } from '@core/enums/unit-of-measure';
import { HazardLevel } from '@core/enums/hazard-level';
import { ICONS_ADMIN_INPUTS } from '@core/ui/icons/icons-admin/icons-admin-inputs/icons-admin-inputs';

@Component({
  selector: 'app-input-category-card',
  standalone: true,
  imports: [FontAwesomeModule, ButtonPages],
  templateUrl: './input-category-card.html'
})
export class InputCategoryCard {
  readonly category = input.required<InputCategoryResponse>();
  readonly edit = output<InputCategoryResponse>();
  readonly deactivate = output<string>();
  readonly icons = ICONS_ADMIN_INPUTS;

  readonly formattedUnit = computed(() => {
    const key = this.category().unitOfMeasure;
    const unit = UnitOfMeasure[key as keyof typeof UnitOfMeasure];
    return unit ? `${unit.description} (${unit.abbreviation})` : key;
  });

  readonly formattedHazard = computed(() => {
    const key = this.category().hazardLevel;
    const hazard = HazardLevel[key as keyof typeof HazardLevel];
    return hazard ? hazard.label : key;
  });
}
