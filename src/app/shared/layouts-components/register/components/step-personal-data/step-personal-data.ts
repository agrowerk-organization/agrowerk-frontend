import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CpfMaskDirective } from '@shared/directives/cpf-mask.directive';
import { TelephoneMaskDirective } from '@shared/directives/telephone-mask.directive';
import { FieldErrorComponent } from '@shared/components/field-error/field-error';
import { ICONS_REGISTER_LAYOUT } from '@core/ui/icons/icons-common/icons-register-layout/icons-register-layout';

@Component({
  selector: 'app-step-personal-data',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FaIconComponent, 
    CpfMaskDirective, 
    TelephoneMaskDirective,
    FieldErrorComponent],
  templateUrl: './step-personal-data.html',
})
export class StepPersonalData {
  readonly form      = input.required<FormGroup>();
  readonly submitted = input<boolean>(false);
  readonly next    = output<void>();

  icons = ICONS_REGISTER_LAYOUT;
}