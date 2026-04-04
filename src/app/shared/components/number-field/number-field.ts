import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './number-field.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberField),
      multi: true,
    },
  ],
})
export class NumberField implements ControlValueAccessor {
  label       = input.required<string>();
  fieldId     = input.required<string>();
  step        = input<number>(1);
  min         = input<number | null>(null);
  max         = input<number | null>(null);
  placeholder = input<string>('0');

  icons = { plus: faPlus, minus: faMinus };

  value      = signal<number | null>(null);
  isDisabled = signal(false);

  canDecrement = computed(() => {
    const min = this.min();
    const val = this.value();
    if (val === null) return min === null;
    return min === null || val > min;
  });

  canIncrement = computed(() => {
    const max = this.max();
    const val = this.value();
    if (val === null) return true;
    return max === null || val < max;
  });

  private onChange: (v: number | null) => void = NumberField.noop;
  private onTouched: () => void = NumberField.noop;

  private static noop(): void { /* required by ControlValueAccessor */ }

  increment(): void {
    if (!this.canIncrement()) return;
    const next = this.round((this.value() ?? 0) + this.step());
    this.emit(next);
  }

  decrement(): void {
    if (!this.canDecrement()) return;
    const next = this.round((this.value() ?? 0) - this.step());
    this.emit(next);
  }

  onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    const parsed = raw === '' ? null : Number(raw);
    this.emit(parsed);
  }

  private emit(v: number | null): void {
    this.value.set(v);
    this.onChange(v);
    this.onTouched();
  }

  private round(v: number): number {
    const decimals = this.step().toString().split('.')[1]?.length ?? 0;
    return Number(v.toFixed(decimals));
  }

  writeValue(v: number | null): void   { this.value.set(v); }
  registerOnChange(fn: (v: number | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void                { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void              { this.isDisabled.set(disabled); }
}