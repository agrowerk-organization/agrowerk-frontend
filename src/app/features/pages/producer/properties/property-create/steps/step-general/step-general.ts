import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { StateResponse } from '@core/types/state/state.response';

@Component({
  selector: 'app-step-general',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-general.html',
})
export class StepGeneral {

  form = input.required<FormGroup>();
  states = input<StateResponse[]>([]);
  
}
