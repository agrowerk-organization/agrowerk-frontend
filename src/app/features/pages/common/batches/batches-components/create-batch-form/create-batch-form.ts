import {
  Component, input, output, signal, OnInit,
  inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { NumberField } from '@shared/components/number-field/number-field';
import { BatchService }         from '@core/services/batch.service';
import { InputService }         from '@core/services/input.service';
import { BatchResponse } from '@core/types/batch/batch.response';
import { InputResponse }        from '@core/types/input/input.response';
import { ICONS_BARTER } from '@core/ui/icons/icons-producer/icons-barter/icons-barter';
import { DateField } from "@shared/components/date-field/date-field";

@Component({
  selector: 'app-create-batch-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonPages,
    NumberField,
    DateField
],
  templateUrl: './create-batch-form.html',
})
export class CreateBatchForm implements OnInit {
  private readonly fb           = inject(FormBuilder);
  private readonly batchService = inject(BatchService);
  private readonly inputService = inject(InputService);

  supplierId = input.required<string>();
  saved      = output<BatchResponse>();
  toCancel   = output<void>();

  saving        = signal(false);
  inputs        = signal<InputResponse[]>([]);
  selectedInput = signal<InputResponse | null>(null);
  pickerOpen    = signal(false);

  readonly icons = ICONS_BARTER;

  form = this.fb.group({
    batchNumber:       ['', [Validators.required, Validators.maxLength(50)]],
    invoiceNumber:     ['', Validators.maxLength(50)],
    inputId:           ['', Validators.required],
    initialQuantity:   [null as number | null, [Validators.required, Validators.min(0.001)]],
    manufacturingDate: ['', Validators.required],
    expirationDate:    ['', Validators.required],
    entryDate:         ['', Validators.required],
    unitPrice:         [null as number | null, [Validators.required, Validators.min(0.01)]],
    notes:             [''],
  });

  ngOnInit(): void {
    this.inputService.findCatalog({ page: 0, size: 100 }).subscribe({
      next: page => this.inputs.set(page.content ?? []),
    });
  }

  selectInput(input: InputResponse): void {
    this.selectedInput.set(input);
    this.form.get('inputId')?.setValue(input.id);
    this.pickerOpen.set(false);
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();

    this.batchService.createBatch({
      batchNumber:       v.batchNumber!,
      invoiceNumber:     v.invoiceNumber ?? undefined,
      inputId:           v.inputId!,
      supplierId:        this.supplierId(),
      initialQuantity:   v.initialQuantity!,
      manufacturingDate: v.manufacturingDate!,
      expirationDate:    v.expirationDate!,
      entryDate:         v.entryDate!,
      unitPrice:         v.unitPrice!,
      notes:             v.notes ?? undefined,
    }).subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}