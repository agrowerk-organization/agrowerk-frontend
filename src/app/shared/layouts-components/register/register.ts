import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { UserValidators } from '@core/validators/user.validators';
import { RoleService } from '@core/services/role.service';
import { UserService } from '@core/services/user.service';
import { EmailService } from '@core/services/email.service';
import { RoleResponse } from '@core/types/role/role.response';
import { RegisterUserRequest } from '@core/types/user/register-user.request';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';
import { StepPersonalData } from './components/step-personal-data/step-personal-data';
import { StepAccessData } from './components/step-access-data/step-access-data';
import { ICONS_REGISTER_LAYOUT } from '@core/ui/icons/icons-common/icons-register-layout/icons-register-layout';
import { AccessProfile } from '@core/enums/access-profile';
import { StepSuccess } from '../step-success/step-success';

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
    StepSuccess
  ],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  private readonly fb          = inject(FormBuilder);
  private readonly roleService = inject(RoleService);
  private readonly userService = inject(UserService);
  private readonly emailService = inject(EmailService);

  readonly router      = inject(Router);
  readonly titleFirst    = input<string>('Criar Conta');
  readonly titleSecond   = input<string>('');
  readonly subtitle      = input<string>('Preencha os dados abaixo para começar');
  readonly roleKeyword = input<AccessProfile | ''>('');

  roles          = signal<RoleResponse[]>([]);
  isLoadingRoles = signal(false);
  isLoading      = signal(false);
  submitted      = signal(false);
  currentStep    = signal<1 | 2 | 3>(1);
  errorMessage   = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  confirmedEmail = signal('');

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

  private readonly ROLE_NAME_MAP: Record<string, string> = {
    [AccessProfile.PRODUCER]: 'PRODUCER',
    [AccessProfile.SYSTEM_ADMIN]: 'SUPPLIER_ADMIN'
  };

  ngOnInit(): void {
    this.isLoadingRoles.set(true);
    this.roleService.listRoles().subscribe({
      next: (roles) => {
        const backendName = this.ROLE_NAME_MAP[this.roleKeyword()];
        
        const matched = roles.find(r => r.name === backendName);
        if (matched) {
          this.form.patchValue({ roleId: matched.roleId });
        } else {
          this.errorMessage.set('Perfil de acesso não encontrado. Recarregue a página.');
        }
        this.isLoadingRoles.set(false);
      },
      error: () => {
        this.errorMessage.set('Erro ao carregar perfil de acesso.');
        this.isLoadingRoles.set(false);
      }
    });
  }

  readonly loginRoute = computed(() => {
    const map: Record<string, string> = {
      [ AccessProfile.PRODUCER ]:    '/login/producer',
      [ AccessProfile.SUPPLIER_ADMIN ]:  '/login/supplier_admin',
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
        this.confirmedEmail.set(this.form.getRawValue().email!);
        this.currentStep.set(3);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message ?? 'Erro ao criar conta. Tente novamente.');
      },
    });
  }

  onResendEmail(): void {
    this.emailService.resendVerification(this.confirmedEmail()).subscribe();
  }
}