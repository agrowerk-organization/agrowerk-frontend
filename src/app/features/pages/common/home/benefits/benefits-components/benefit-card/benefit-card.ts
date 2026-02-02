import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Benefit } from '../../../../../../../core/ui/types/benefit/benefit';

@Component({
  selector: 'app-benefit-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './benefit-card.html'
})

export class BenefitCard {
  benefit = input.required<Benefit>();

  delay = input<string>();
}
