import {
  Component,
  forwardRef,
  input,
  signal,
  computed,
  HostListener,
  ElementRef,
  inject
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faCheck, faBoxes } from '@fortawesome/free-solid-svg-icons';

export interface BatchSelectOption {
  value: string;
  label: string;
  batchNumber: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

@Component({
  selector: 'app-batch-select-field',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CurrencyPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BatchSelectField),
      multi: true,
    }
  ],
  templateUrl: './batch-select-field.html'
})
export class BatchSelectField implements ControlValueAccessor {
  label    = input<string>('Lote que você compromete *');
  fieldId = input<string>('batch-select');
  options  = input<BatchSelectOption[]>([]);

  readonly icons = {
    CHEVRON_DOWN: faChevronDown,
    CHECK: faCheck,
    BOXES: faBoxes,
  };

  isOpen        = signal(false);
  selectedValue = signal<string | null>(null);
  isDisabled    = signal(false);

  private elementRef = inject(ElementRef);
  private onChange: (val: string | null) => void = () => undefined;
  onTouched: () => void = () => undefined;

  selectedOption = computed(() =>
    this.options().find(o => o.value === this.selectedValue()) ?? null
  );

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggle(): void {
    if (this.isDisabled()) return;
    this.isOpen.update(v => !v);
    this.onTouched();
  }

  select(option: BatchSelectOption): void {
    this.selectedValue.set(option.value);
    this.onChange(option.value);
    this.isOpen.set(false);
  }

  writeValue(value: string | null): void {
    this.selectedValue.set(value);
  }

  registerOnChange(fn: (val: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}