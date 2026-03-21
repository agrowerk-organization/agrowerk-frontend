import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-error.html'
})
export class FieldErrorComponent {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input() submitted = false;
  @Input() formGroup?: AbstractControl | null;
  @Input() groupError?: string;
  @Input() groupErrorMessage?: string;

  shouldShowError(): boolean {
    const fieldInvalid = !!(
      this.control?.invalid && (this.control.touched || this.submitted)
    );
    const groupInvalid = !!(
      this.groupError &&
      this.formGroup?.hasError(this.groupError) &&
      (this.submitted || this.control?.touched)
    );
    return fieldInvalid || groupInvalid;
  }

  getErrorMessage(): string {
    if (this.groupError && this.formGroup?.hasError(this.groupError))
      return this.groupErrorMessage ?? 'Erro de validação';

    if (this.control?.hasError('required'))         return 'Campo obrigatório';
    if (this.control?.hasError('email'))            return 'E-mail inválido';
    if (this.control?.hasError('minlength'))        return `Mínimo de ${this.control.errors?.['minlength'].requiredLength} caracteres`;
    if (this.control?.hasError('cpfFormat'))        return 'CPF incompleto (11 dígitos)';
    if (this.control?.hasError('telephoneFormat'))  return 'Telefone inválido';
    if (this.control?.hasError('passwordStrength')) return 'Deve ter maiúscula, minúscula, número e caractere especial';
    return 'Entrada inválida';
  }
}