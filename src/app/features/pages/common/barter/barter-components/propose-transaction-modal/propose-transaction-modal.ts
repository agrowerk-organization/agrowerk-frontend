import { Component, computed, inject, input, output, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BatchService } from '@core/services/batch.service';
import { BarterTransactionService } from '@core/services/barter-transaction.service';
import { ProposeTransactionRequest } from '@core/types/barter/propose-transaction.request';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { OfferType } from '@core/enums/offer-type';
import { DateField } from "@shared/components/date-field/date-field";
import { BatchSelectOption } from '@core/ui/types/batch/batch-select-option';
import { BatchSelectField } from '@shared/components/batch-select-field/batch-select-field';

@Component({
  selector: 'app-propose-transaction-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonPages,
    CurrencyPipe,
    DateField,
    BatchSelectField
  ],
  templateUrl: './propose-transaction-modal.html'
})
export class ProposeTransactionModal implements OnInit {

  offer     = input.required<BarterOfferResponse>();
  toCancel  = output<void>();
  proposed  = output<BarterTransactionResponse>();

  private fb         = inject(FormBuilder);
  private txService  = inject(BarterTransactionService);
  private batchService = inject(BatchService);

  saving       = signal(false);
  batchOptions = signal<BatchSelectOption[]>([]);

  readonly icons = ICONS_BARTER;
  readonly type  = OfferType;

  form = this.fb.group({
    batchId:             [null as string | null, Validators.required],
    offerorDeliveryDate: ['', Validators.required],
    notes:               [''],
  });

  totalRequestedValue = () =>
    this.offer().requestedItems?.reduce((s, i) => s + i.totalPriceBrl, 0) ?? 0;


  selectedBatch = computed(() => {
    const id = this.form.get('batchId')?.value;
    return this.batchOptions().find(b => b.value === id) ?? null;
  });

  ngOnInit(): void {
    this.loadBatches();
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;

    const v = this.form.getRawValue();
    const request: ProposeTransactionRequest = {
      offerId:             this.offer().id,
      batchId:             v.batchId!,
      offerorDeliveryDate: v.offerorDeliveryDate!,
      notes:               v.notes ?? undefined,
    };

    this.saving.set(true);
    this.txService.propose(request).subscribe({
      next: res => {
        this.saving.set(false);
        this.proposed.emit(res);
      },
      error: () => this.saving.set(false),
    });
  }

  private loadBatches(): void {
    const offerInputIds = this.offer().requestedItems?.map(i => i.inputId);

    this.batchService.findMyAvailableBatches().subscribe(page => {
      this.batchOptions.set(
        (page.content ?? [])
          .filter(b => offerInputIds?.includes(b.inputId))
          .map(b => ({
            value: b.id,
            label: b.inputName,
            batchNumber: b.batchNumber,
            quantity: b.currentQuantity,
            unit: 'R$',
            unitPrice: b.unitPrice,
          }))
      );
    });
  }
}