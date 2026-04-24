import { Component, computed, inject, input, output, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { SelectField } from '@shared/components/select-field/select-field';
import { NumberField } from '@shared/components/number-field/number-field';
import { SelectOption } from '@core/ui/types/select-option/select-option';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { AcceptTransactionRequest } from '@core/types/barter/accept-transaction.request';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { BarterTransactionService } from '@core/services/barter-transaction.service';
import { CommodityPriceService } from '@core/services/commodity-price.service';
import { Commodity } from '@core/types/market/commodity';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { CommodityPriceResponse } from '@core/types/market/commodity-price.response';
import { BarterPricePreview } from '@core/ui/types/barter/price-preview';

@Component({
  selector: 'app-accept-transaction-modal',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FontAwesomeModule,
    ButtonPages, 
    SelectField, 
    NumberField,
    CurrencyPipe, 
    DatePipe
  ],
  templateUrl: './accept-transaction-modal.html'
})
export class AcceptTransactionModal implements OnInit {

  transaction = input.required<BarterTransactionResponse>();
  offer = input.required<BarterOfferResponse>();

  toCancel  = output<void>();
  accepted  = output<BarterTransactionResponse>();
  declined  = output<void>();

  private fb           = inject(FormBuilder);
  private txService    = inject(BarterTransactionService);
  private commodityPriceService = inject(CommodityPriceService);

  saving       = signal(false);
  loadingPrice = signal(false);
  pricing      = signal<BarterPricePreview | null>(null);

  readonly icons = ICONS_BARTER;

  readonly commodityOptions: SelectOption[] = [
    { value: 'SOYBEAN', label: 'Soja' },
    { value: 'CORN',    label: 'Milho' },
    { value: 'COTTON',  label: 'Algodão' },
    { value: 'WHEAT',   label: 'Trigo' },
  ];

  form = this.fb.group({
    commodity: ['SOYBEAN', Validators.required],
    basisUsd:  [0, [Validators.required]],
  });

  totalInputsBrl = computed(() =>
    this.offer().requestedItems?.reduce((s, i) => s + i.totalPriceBrl, 0) ?? 0
  );

  ngOnInit(): void {
    this.fetchPricing();
  }

  recalculate(): void {
    this.fetchPricing();
  }

  accept(): void {
    if (this.form.invalid || this.saving()) return;

    const v = this.form.getRawValue();
    const request: AcceptTransactionRequest = {
      commodity: v.commodity!,
      basisUsd:  v.basisUsd!,
    };

    this.saving.set(true);
    this.txService.accept(this.transaction().id, request).subscribe({
      next: res => {
        this.saving.set(false);
        this.accepted.emit(res);
      },
      error: () => this.saving.set(false),
    });
  }

  decline(): void {
    this.txService.decline(this.transaction().id).subscribe({
      next: () => this.declined.emit(),
    });
  }


private fetchPricing(): void {
  const { commodity, basisUsd } = this.form.getRawValue();
  const commodityEnum = commodity as Commodity;

  if (!commodityEnum) return;

  this.loadingPrice.set(true);

  this.commodityPriceService.getLatest(commodityEnum).subscribe({
    next: (res: CommodityPriceResponse) => {
      const adjustedPriceUsd = res.priceUsd + (basisUsd ?? 0);
      const bagPriceBrl = adjustedPriceUsd * res.ptaxRate;

      const totalBagsDue = this.totalInputsBrl() > 0 
        ? Math.ceil(this.totalInputsBrl() / bagPriceBrl) 
        : 0;

      const preview: BarterPricePreview = {
        ...res,
        bagPriceBrl,
        totalBagsDue
      };

      this.pricing.set(preview);
      this.loadingPrice.set(false);
    },
    error: () => {
      this.loadingPrice.set(false);
      this.pricing.set(null);
    }
  });
}
}