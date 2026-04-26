import { Component, computed, inject, input, output, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BarterOfferService } from '@core/services/barter-offer.service';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { OfferStatus, OfferStatusDesc } from '@core/enums/offer-status';
import { OfferType } from '@core/enums/offer-type';
import { DateField } from "@shared/components/date-field/date-field";
import { NumberField } from '@shared/components/number-field/number-field';
@Component({
  selector: 'app-edit-offer-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonPages,
    DateField,
    NumberField
],
  templateUrl: './edit-offer-modal.html'
})
export class EditOfferModal implements OnInit {

  offer   = input.required<BarterOfferResponse>();
  toCancel = output<void>();
  updated  = output<BarterOfferResponse>();

  private fb           = inject(FormBuilder);
  private offerService = inject(BarterOfferService);

  saving = signal(false);
  readonly status = OfferStatus;
  readonly type = OfferType;
  OfferType = signal<OfferType>(OfferType.CROP);

  readonly icons = ICONS_BARTER;

  statusLabel = computed(() => {
    const status = this.offer().status as OfferStatus;
    return OfferStatusDesc[status] || status;
  });

  isActive = computed(() => this.offer().status === OfferStatus.ACTIVE);

  offerDelta = computed(() => {
    const suggested = this.offer().suggestedQuantity;
    const offered   = this.offer().offeredCropQuantity;
    if (!suggested || !offered) return null;
    const diff = offered - suggested;
    if (Math.abs(diff) < 0.1) return null;
    return {
      value: Math.abs(diff).toFixed(1),
      direction: diff > 0 ? 'acima' : 'abaixo'
    };
  });

  form = this.fb.group({
    title:                [''],
    description:          [''],
    requestedDescription: [''],
    expiresAt:            [''],
    offeredCropQuantity:  [null as number | null],
    offeredAssetQuantity: [null as number | null],
  });
  
  ngOnInit(): void {
    const o = this.offer();
    this.form.patchValue({
      title:                o.title,
      description:          o.description ?? '',
      requestedDescription: o.requestedDescription ?? '',
      expiresAt:            o.expiresAt ? o.expiresAt.substring(0, 10) : '',
      offeredCropQuantity:  o.offeredCropQuantity ?? null,
      offeredAssetQuantity: o.offeredAssetQuantity ?? null,
    });
    if (!this.isActive()) this.form.disable();
  }
  
  submit(): void {
    if (this.saving()) return;
    const v = this.form.getRawValue();
    const request = {
      title:                v.title                || undefined,
      description:          v.description          || undefined,
      requestedDescription: v.requestedDescription || undefined,
      expiresAt:            v.expiresAt            || undefined,
      offeredCropQuantity:  v.offeredCropQuantity  ?? undefined,
      offeredAssetQuantity: v.offeredAssetQuantity ?? undefined,
    };

    this.saving.set(true);
    this.offerService.updateOffer(this.offer().id, request).subscribe({
      next: res => {
        this.saving.set(false);
        this.updated.emit(res);
      },
      error: () => this.saving.set(false),
    });
  }

  get isReadOnly(): boolean {
    return this.offer().status !== OfferStatus.ACTIVE;
  }
}