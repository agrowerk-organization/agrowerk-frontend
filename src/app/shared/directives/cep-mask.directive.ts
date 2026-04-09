import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCepMask]',
  standalone: true,
})
export class CepMaskDirective {
  private ngControl = inject(NgControl);

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '').slice(0, 8);

    if (digits.length > 5) {
      digits = digits.slice(0, 5) + '-' + digits.slice(5);
    }

    this.ngControl.control?.setValue(digits, { emitEvent: true });
  }
}