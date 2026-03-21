import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class UserValidators {
  static passwordStrength(ctrl: AbstractControl): ValidationErrors | null {
    const v: string = ctrl.value ?? '';
    const ok = /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v) && /[\p{P}\p{S}]/u.test(v);
    return ok ? null : { passwordStrength: true };
  }

  static passwordMatch: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pwd = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return confirm && pwd !== confirm ? { passwordMismatch: true } : null;
  };

  static telephoneFormat(ctrl: AbstractControl): ValidationErrors | null {
    const digits = (ctrl.value ?? '').replace(/\D/g, '');
    return digits.length === 11 ? null : { telephoneFormat: true };
  }

  static cpfFormat(ctrl: AbstractControl): ValidationErrors | null {
    const digits = (ctrl.value ?? '').replace(/\D/g, '');
    return digits.length === 11 ? null : { cpfFormat: true };
  }
}