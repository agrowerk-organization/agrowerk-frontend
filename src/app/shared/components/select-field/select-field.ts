import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { SelectOption } from '@core/ui/types/select-option/select-option';
@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './select-field.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectField),
      multi: true
    }
  ]
})
export class SelectField implements ControlValueAccessor {
  label       = input.required<string>();
  placeholder = input<string>('Selecione...');
  options     = input.required<SelectOption[]>();
  fieldId     = input<string>('select-field');

  icons = { chevron: faChevronDown, check: faCheck };

  isOpen       = signal(false);
  selectedValue = signal<string | number | null>(null);
  isDisabled   = signal(false);

  private static noop(): void { /* required by ControlValueAccessor */ }

  private onChange: (v: string | number | null) => void = SelectField.noop;
  private onTouched: () => void  = SelectField.noop;
  private host = inject(ElementRef);

  get selectedLabel(): string {
    const opt = this.options().find(o => o.value === this.selectedValue());
    return opt?.label ?? '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent) {
    if (!this.host.nativeElement.contains(e.target)) {
      this.isOpen.set(false);
    }
  }

  toggle() {
    if (!this.isDisabled()) this.isOpen.update(v => !v);
  }

  select(option: SelectOption) {
    this.selectedValue.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.isOpen.set(false);
  }

  writeValue(value: string | number | null) { this.selectedValue.set(value); }
  registerOnChange(fn: (value: string | number | null) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.isDisabled.set(disabled); }
}