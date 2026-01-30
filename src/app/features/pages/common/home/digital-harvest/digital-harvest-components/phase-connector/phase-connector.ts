import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-phase-connector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './phase-connector.html'
})

export class PhaseConnector {
  isPassed = input(false);
}
