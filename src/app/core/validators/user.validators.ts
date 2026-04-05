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

  static passwordMatchFields(field1: string, field2: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const val1 = group.get(field1)?.value;
      const val2 = group.get(field2)?.value;
      return val1 === val2 ? null : { passwordMismatch: true };
    };
  }
}