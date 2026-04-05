import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserValidators } from '@core/validators/user.validators';
import { PasswordResetService } from '@core/services/password-reset.service';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';
import { StepEmail } from './components/step-email/step-email';
import { StepCode } from './components/step-code/step-code';
import { StepPassword } from './components/step-password/step-password';
import { StepResetSuccess } from '@shared/layouts-components/step-reset-success/step-reset-success';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    Title,
    Subtitle,
    StepEmail,
    StepCode,
    StepPassword,
    StepResetSuccess,
  ],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword implements OnInit {
  private readonly fb          = inject(FormBuilder);
  private readonly passwordResetService = inject(PasswordResetService); 
  readonly router              = inject(Router);

  isLoading      = signal(false);
  submitted      = signal(false);
  currentStep    = signal<1 | 2 | 3 | 4>(1);
  errorMessage   = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  readonly emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  readonly codeForm = this.fb.group({
    token: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
  });

  readonly passwordForm = this.fb.group({
    newPassword:     ['', [Validators.required, UserValidators.passwordStrength]],
    confirmPassword: ['', Validators.required],
  }, { validators: UserValidators.passwordMatchFields('newPassword', 'confirmPassword') }); // 👈

  ngOnInit(): void {
    this.codeForm.get('token')?.valueChanges.subscribe(val => {
      if (!val) return;
      const cleaned = val.trim().toLowerCase();
      if (cleaned !== val) {
        this.codeForm.get('token')?.setValue(cleaned, { emitEvent: false });
      }
    });
  }

  onSubmitEmail(): void {
    this.submitted.set(true);
    this.errorMessage.set(null);
    if (this.emailForm.invalid) return;

    this.isLoading.set(true);

    this.passwordResetService.forgotPassword(this.emailForm.value.email!).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.submitted.set(false);
        this.currentStep.set(2);
      },
      error: () => {
        this.isLoading.set(false);
        this.submitted.set(false);
        this.currentStep.set(2);
      },
    });
  }

  onSubmitCode(): void {
    this.submitted.set(true);
    this.errorMessage.set(null);
    if (this.codeForm.invalid) return;

    this.isLoading.set(true);

    const token = this.codeForm.value.token!.trim();

    this.passwordResetService.validateResetToken(token).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.submitted.set(false);
        this.currentStep.set(3);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.status === 400 ? 'Código inválido ou expirado.' : 'Erro ao validar o código.'
        );
      },
    });
  }

  onSubmitPassword(): void {
    this.submitted.set(true);
    this.errorMessage.set(null);
    if (this.passwordForm.invalid) return;

    this.isLoading.set(true);

    this.passwordResetService.resetPassword({
      token:       this.codeForm.value.token!.trim().toLowerCase(),
      newPassword: this.passwordForm.value.newPassword!,
      confirmPassword: this.passwordForm.value.confirmPassword!,
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.submitted.set(false);
        this.currentStep.set(4);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.status === 400
            ? 'Token expirado. Solicite um novo código.'
            : 'Erro ao redefinir a senha.'
        );
      },
    });
  }

  goBack(): void {
    this.errorMessage.set(null);
    this.submitted.set(false);
    if (this.currentStep() === 2) this.currentStep.set(1);
    else if (this.currentStep() === 3) this.currentStep.set(2);
  }
}