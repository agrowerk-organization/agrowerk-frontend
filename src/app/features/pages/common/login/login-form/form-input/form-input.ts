import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.html'
})
export class FormInput {
  label = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  control = input.required<AbstractControl | null>();
  errorMessage = input<string>('Invalid field');
  id = input<string>(`input-${Math.random().toString(36).substring(2, 9)}`);

  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  get isInvalid() {
    const c = this.control();
    return c?.invalid && c?.touched;
  }
}
