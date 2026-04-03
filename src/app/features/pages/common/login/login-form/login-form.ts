import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormInput } from './form-input/form-input';
import { FormButton } from '@shared/components/buttons/form-button/form-button';
import { AuthService } from '@core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthSocialForm } from './auth-social-form/auth-social-form';
import { AuthSocial } from '@core/ui/types/auth-social/auth-social';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const REGISTER_ROUTES: Record<string, string> = {
  producer:      '/register/producer',
  supplier_admin: '/register/supplier-admin',
};

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormInput,
    FormButton,
    AuthSocialForm,
  ],
  templateUrl: './login-form.html',
})
export class LoginForm {
  private readonly formBuilder  = inject(FormBuilder);
  private readonly authService  = inject(AuthService);
  private readonly route        = inject(ActivatedRoute);

  readonly isLoading    = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  private readonly role = toSignal(
    this.route.paramMap.pipe(map(p => p.get('role') ?? ''))
  );

  readonly registerRoute = computed(
    () => REGISTER_ROUTES[this.role() ?? ''] ?? '/register/producer'
  );

  readonly showRegister = computed(() =>  {
    const currentRole = this.role();
    return currentRole !== 'system_admin';
  });


  readonly loginForm = this.formBuilder.nonNullable.group({
    email:      ['', [Validators.required, Validators.email]],
    password:   ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false],
  });

  authSocialWays: AuthSocial[] = [
    {
      id: 1,
      name: 'Google',
      description: 'Entrar com Google',
      icon: '/assets/svgs/google.svg',
      action: () => this.loginWithGoogle(),
    },
    {
      id: 2,
      name: 'Microsoft',
      description: 'Entrar com Microsoft',
      icon: '/assets/svgs/microsoft.svg',
      action: () => this.loginWithMicrosoft(),
    },
  ];

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => this.authService.redirectByRole(response.role),
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        if (error.status === 401)
          this.errorMessage.set('E-mail ou senha incorretos.');
        else if (error.status === 403)
          this.errorMessage.set('Sua conta está bloqueada. Contate nosso suporte.');
        else
          this.errorMessage.set('Ocorreu um erro ao fazer login.');
      },
    });
  }

  loginWithGoogle(): void {
    this.isLoading.set(true);
  }
  loginWithMicrosoft(): void {
    this.isLoading.set(true);
  }
}