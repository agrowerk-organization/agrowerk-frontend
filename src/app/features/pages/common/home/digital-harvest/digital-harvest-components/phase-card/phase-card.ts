import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TimelinePhase } from '@core/ui/types/timeline-phase/timeline-phase';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-phase-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './phase-card.html'
})

export class PhaseCard {
  phase = input.required<TimelinePhase>();
  isActive = input(false);
  selected = output<void>();
}
