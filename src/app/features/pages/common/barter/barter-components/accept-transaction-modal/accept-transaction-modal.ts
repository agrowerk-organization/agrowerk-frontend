import { Component, computed, inject, input, output, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { AcceptTransactionRequest } from '@core/types/barter/accept-transaction.request';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { BarterTransactionService } from '@core/services/barter-transaction.service';
import { CommodityPriceService } from '@core/services/commodity-price.service';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { CommodityPriceResponse } from '@core/types/market/commodity-price.response';
import { BarterPricePreview } from '@core/ui/types/barter/price-preview';
import { Commodity } from '@core/enums/commodity';
import { NumberField } from "@shared/components/number-field/number-field";

@Component({
  selector: 'app-accept-transaction-modal',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ButtonPages,
    CurrencyPipe,
    DatePipe,
    ReactiveFormsModule,
    NumberField
],
  templateUrl: './accept-transaction-modal.html'
})
export class AcceptTransactionModal implements OnInit {
  private fb = inject(FormBuilder);
  form!: FormGroup;

  transaction = input.required<BarterTransactionResponse>();
  offer       = input.required<BarterOfferResponse>();

  toCancel  = output<void>();
  accepted  = output<BarterTransactionResponse>();
  declined  = output<void>();

  private txService             = inject(BarterTransactionService);
  private commodityPriceService = inject(CommodityPriceService);

  saving       = signal(false);
  loadingPrice = signal(false);
  pricing      = signal<BarterPricePreview | null>(null);

  readonly icons = ICONS_BARTER;

  private commodity = computed<string>(() => {
    const name = this.offer().offeredCropName?.toUpperCase() ?? '';
    if (name.includes('MILHO'))                        return 'MILHO';
    if (name.includes('ALGOD'))                        return 'ALGODAO';
    if (name.includes('TRIGO'))                        return 'TRIGO';
    if (name.includes('CAF'))                          return 'CAFE';
    if (name.includes('BOI') || name.includes('BOVI')) return 'BOI_GORDO';
    if (name.includes('A') && name.includes('CAR'))    return 'ACUCAR';
    return 'SOJA';
  });

  totalInputsBrl = computed(() =>
    this.offer().requestedItems?.reduce((s, i) => s + i.totalPriceBrl, 0) ?? 0
  );

  ngOnInit(): void {
    this.form = this.fb.group({
      commodity: this.commodity(),
      basisUsd: this.fb.control(0, { validators: [Validators.required], nonNullable: true }),
    })
    this.fetchPricing();
  }

  accept(): void {
    if (this.saving()) return;

    const request: AcceptTransactionRequest = {
      commodity: this.commodity(),
      basisUsd: this.form.getRawValue().basisUsd ?? 0,
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

 fetchPricing(): void {
    this.loadingPrice.set(true);
    this.commodityPriceService.getLatest(this.commodity() as Commodity).subscribe({
      next: (res: CommodityPriceResponse) => {
        const basisUsd = this.form.getRawValue().basisUsd ?? 0;
        const bagPriceBrl = (res.priceUsd + basisUsd) * res.ptaxRate;
        const totalBagsDue = this.totalInputsBrl() > 0
          ? Math.ceil(this.totalInputsBrl() / bagPriceBrl)
          : 0;
        this.pricing.set({ ...res, bagPriceBrl, totalBagsDue });
        this.loadingPrice.set(false);
      },
      error: () => {
        this.loadingPrice.set(false);
        this.pricing.set(null);
      }
    });
  }
}