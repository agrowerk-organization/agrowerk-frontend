import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormButton } from '@shared/components/buttons/form-button/form-button';

@Component({
  selector: 'app-step-email',
  standalone: true,
  imports: [
     CommonModule,
     ReactiveFormsModule,
     FormButton
    ],
  templateUrl: './step-email.html'
})
export class StepEmail {
  form = input.required<FormGroup>();
  submitted = input<boolean>(false);
  loading = input<boolean>(false);
  next = output<void>();
}
