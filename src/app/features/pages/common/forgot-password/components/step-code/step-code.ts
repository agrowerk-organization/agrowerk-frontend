import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormButton } from '@shared/components/buttons/form-button/form-button';
@Component({
  selector: 'app-step-code',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormButton
  ],
  templateUrl: './step-code.html'
})
export class StepCode {
  form = input.required<FormGroup>();
  submitted = input<boolean>(false);
  loading = input<boolean>(false);
  email = input<string>('');
  next = output<void>();
  back = output<void>();
}
