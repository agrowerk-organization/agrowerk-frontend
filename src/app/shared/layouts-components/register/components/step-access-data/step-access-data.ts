import { Component, input, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FieldErrorComponent } from '@shared/components/field-error/field-error';
import { RoleResponse } from '@core/types/role/role.response';
import { ICONS_REGISTER_LAYOUT } from '@core/ui/icons/icons-common/icons-register-layout/icons-register-layout';

@Component({
  selector: 'app-step-access-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
     FaIconComponent, 
     FieldErrorComponent],
  templateUrl: './step-access-data.html',
})
export class StepAccessData {
  readonly form           = input.required<FormGroup>();
  readonly roles          = input<RoleResponse[]>([]);
  readonly loading        = input<boolean>(false);
  readonly submitted      = input<boolean>(false);
  readonly isLoadingRoles = input<boolean>(false);
  readonly back         = output<void>();

  showPassword = signal(false);
  showConfirm  = signal(false);

  icons = ICONS_REGISTER_LAYOUT;

  togglePassword(): void { this.showPassword.update(v => !v); }
  toggleConfirm(): void  { this.showConfirm.update(v => !v); }
}