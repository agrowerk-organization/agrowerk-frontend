import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimelinePhase } from '@core/ui/types/timeline-phase/timeline-phase';
import { StatCard } from '../stat-card/stat-card';

@Component({
  selector: 'app-phase-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, StatCard],
  templateUrl: './phase-details.html'
})

export class PhaseDetails {
  phase = input.required<TimelinePhase>();
}
