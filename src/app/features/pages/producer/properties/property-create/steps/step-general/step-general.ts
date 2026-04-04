import { CommonModule } from '@angular/common';
import { Component,  computed, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { StateResponse } from '@core/types/state/state.response';
import { NumberField } from '@shared/components/number-field/number-field';
import { SelectField } from '@shared/components/select-field/select-field';

@Component({
  selector: 'app-step-general',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    SelectField,
    NumberField
  ],
  templateUrl: './step-general.html',
})
export class StepGeneral {

  form = input.required<FormGroup>();
  states = input<StateResponse[]>([]);
  
  stateOptions = computed(() =>
    this.states().map(s => ({ value: s.id, label: s.name }))
  );
}
