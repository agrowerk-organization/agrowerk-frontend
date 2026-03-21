import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { UserValidators } from '@core/validators/user.validators';
import { RoleService } from '@core/services/role.service';
import { UserService } from '@core/services/user.service';
import { RoleResponse } from '@core/types/role/role.response';
import { RegisterUserRequest } from '@core/types/user/register-user.request';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';
import { StepPersonalData } from './components/step-personal-data/step-personal-data';
import { StepAccessData } from './components/step-access-data/step-access-data';
import { ICONS_REGISTER_LAYOUT } from '@core/ui/icons/icons-common/icons-register-layout/icons-register-layout';

@Component({
  selector: 'app-register-form-layout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FaIconComponent,
    Title,
    Subtitle,
    StepPersonalData,
    StepAccessData,
  ],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  private readonly fb          = inject(FormBuilder);
  private readonly roleService = inject(RoleService);
  private readonly userService = inject(UserService);
  private readonly router      = inject(Router);

  readonly titleFirst    = input<string>('Criar Conta');
  readonly titleSecond   = input<string>('');
  readonly subtitle      = input<string>('Preencha os dados abaixo para começar');
  readonly roleKeyword   = input<string>('');

  roles          = signal<RoleResponse[]>([]);
  isLoadingRoles = signal(false);
  isLoading      = signal(false);
  submitted      = signal(false);
  currentStep    = signal<1 | 2>(1);
  errorMessage   = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  icons = ICONS_REGISTER_LAYOUT;

  readonly form = this.fb.group({
    name:            ['', [Validators.required, Validators.minLength(3)]],
    cpf:             ['', [Validators.required, UserValidators.cpfFormat]],
    telephone:       ['', [Validators.required, UserValidators.telephoneFormat]],
    email:           ['', [Validators.required, Validators.email]],
    password:        ['', [Validators.required, UserValidators.passwordStrength]],
    confirmPassword: ['', Validators.required],
    roleId:          ['', Validators.required],
    lgpdConsent:     [false, Validators.requiredTrue],
  }, { validators: UserValidators.passwordMatch });

  ngOnInit(): void {
    this.isLoadingRoles.set(true);
    this.roleService.listRoles().subscribe({
      next: (roles) => {
        const keyword = this.roleKeyword().toLowerCase();
        const filtered = keyword
          ? roles.filter(r => r.name.toLowerCase().includes(keyword))
          : roles;

        this.roles.set(filtered);
        if (filtered.length === 1) this.form.patchValue({ roleId: filtered[0].roleId });
        this.isLoadingRoles.set(false);
      },
      error: () => this.isLoadingRoles.set(false),
    });
  }

  readonly loginRoute = computed(() => {
    const map: Record<string, string> = {
      produtor:    '/login/producer',
      fornecedor:  '/login/supplier_admin',
    };
    return map[this.roleKeyword()] ?? '/login/producer';
  });

  nextStep(): void {
    ['name', 'cpf', 'telephone'].forEach(f => this.form.get(f)?.markAsTouched());
    const valid = ['name', 'cpf', 'telephone'].every(f => this.form.get(f)?.valid);
    if (valid) this.currentStep.set(2);
  }
  

prevStep(): void {
    this.currentStep.set(1);
    this.errorMessage.set(null);
  }

  onSubmit(): void {
    this.submitted.set(true);
    this.errorMessage.set(null);
    if (this.form.invalid) return;

    this.isLoading.set(true);
    const v = this.form.getRawValue();

    const request: RegisterUserRequest = {
      name:            v.name!,
      email:           v.email!,
      password:        v.password!,
      confirmPassword: v.confirmPassword!,
      cpf:             v.cpf!,
      telephone:       v.telephone!,
      roleId:          v.roleId!,
    };

    this.userService.register(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Conta criada com sucesso! Redirecionando...');
        setTimeout(() => this.router.navigate([this.loginRoute()]), 2200);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message ?? 'Erro ao criar conta. Tente novamente.');
      },
    });
  }
}