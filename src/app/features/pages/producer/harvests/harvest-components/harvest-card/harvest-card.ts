import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { HarvestResponse } from '@core/types/harvest/harvest.response';
import { ICONS_HARVEST } from '@core/ui/icons/icons-producer/icons-harvest/icons-harvest';

@Component({
  selector: 'app-harvest-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './harvest-card.html'
})
export class HarvestCard {
  harvest = input.required<HarvestResponse>();
  finalize = output<HarvestResponse>();

  readonly icons = ICONS_HARVEST;
}
