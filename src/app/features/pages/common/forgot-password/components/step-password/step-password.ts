import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICONS_FORGOT_PASSWORD } from '@core/ui/icons/icons-common/icons-forgot-password/icons-forgot-password';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormButton } from '@shared/components/buttons/form-button/form-button';
@Component({
  selector: 'app-step-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FaIconComponent,
    FormButton
  ],
  templateUrl: './step-password.html',
})
export class StepPassword {
  form      = input.required<FormGroup>();
  submitted = input<boolean>(false);
  loading   = input<boolean>(false);
  next      = output<void>();
  back      = output<void>();

  showPassword        = signal(false);
  showConfirmPassword = signal(false);

  togglePassword() { this.showPassword.update(v => !v); }
  toggleConfirmPassword() { this.showConfirmPassword.update(v => !v); }

  readonly icons = ICONS_FORGOT_PASSWORD;
}