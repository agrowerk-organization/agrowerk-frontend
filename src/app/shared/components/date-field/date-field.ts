import {
  Component,
  forwardRef,
  input,
  signal,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';

@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateField),
      multi: true,
    }
  ],
  templateUrl: './date-field.html'
})
export class DateField implements ControlValueAccessor, OnInit, AfterViewInit {

  label    = input<string>('');
  fieldId  = input<string>('date-field');
  disabled = input<boolean>(false);
  disablePast = input<boolean>(false);

  private pendingValue: Date | null = null;

  minDate = input<Date | null | undefined, string>(undefined, {
    transform: (value) => {
      if (!value) return undefined;
      if (typeof value === 'number') return new Date(value);
      if (typeof value === 'string') return new Date(value);
      return value;
    }
  }); 

  maxDate = input<Date | null | undefined, string>(undefined, {
    transform: (value) => {
      if (!value) return undefined;
      if (typeof value === 'number') return new Date(value);
      if (typeof value === 'string') return new Date(value);
      return value;
    }
  });

  readonly icons = { CALENDAR: faCalendarDays };

  innerControl = new FormControl<Date | null>(null);
  fieldDisabled = signal(false);

  @ViewChild('dateInput') dateInput!: ElementRef;
  private picker: flatpickr.Instance | null = null;

  private onChange: (val: string | null) => void = () => undefined;
  onTouched: () => void = () => undefined;


  ngOnInit(): void {
    this.innerControl.valueChanges.subscribe(date => {
      this.onChange(date ? this.toIsoDate(date) : null);
      this.onTouched();
    });
  }

  ngAfterViewInit(): void {
    const finalMinDate = this.disablePast() ? "today" : (this.minDate() ?? undefined);
    this.picker = flatpickr(this.dateInput.nativeElement, {
      dateFormat: 'd/m/Y',
      locale: Portuguese,
      minDate: finalMinDate,
      maxDate: this.maxDate() ?? undefined,
      allowInput: false,
      appendTo: document.body,
      disableMobile: true,
      onChange: (dates) => {
        const date = dates[0] ?? null;
        this.innerControl.setValue(date);
      }
    });
  
    if (this.pendingValue !== null) {
      this.picker.setDate(this.pendingValue, false);
      this.pendingValue = null;
    }
  }

  openPicker() {
    this.picker?.open();
  }


  writeValue(value: string | null): void {
    if (value) {
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      this.innerControl.setValue(date, { emitEvent: false });
      if (this.picker) {
        this.picker.setDate(date, false);
      } else {
        this.pendingValue = date;
      }
    } else {
      this.innerControl.setValue(null, { emitEvent: false });
      if (this.picker) {
        this.picker.clear();
      } else {
        this.pendingValue = null;
      }
    }
  }
  
  registerOnChange(fn: (val: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.fieldDisabled.set(isDisabled);

    if (isDisabled) {
      this.innerControl.disable();
      this.picker?.close();
    } else {
      this.innerControl.enable();
    }
  }

  private toIsoDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}