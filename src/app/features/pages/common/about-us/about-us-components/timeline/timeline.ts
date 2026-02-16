import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Milestone } from '../../../../../../core/ui/types/about-us/milestone';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.html'
})
export class Timeline {
  milestones = input.required<Milestone[]>();
}
