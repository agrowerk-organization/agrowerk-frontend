import { Component, inject, input, output, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { SelectField } from '@shared/components/select-field/select-field';
import { NumberField } from '@shared/components/number-field/number-field';
import { BarterTransactionService } from '@core/services/barter-transaction.service';
import { CropService } from '@core/services/crop.service';
import { InventoryAssetService } from '@core/services/inventory-assets.service';
import { ProposeTransactionRequest } from '@core/types/barter/propose-transaction.request';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { SelectOption } from '@core/ui/types/select-option/select-option';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { OfferType } from '@core/enums/offer-type';

@Component({
  selector: 'app-propose-transaction-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FontAwesomeModule,
    ButtonPages,
    SelectField,
    NumberField,
    CurrencyPipe
  ],
  templateUrl: './propose-transaction-modal.html'
})
export class ProposeTransactionModal implements OnInit {

  offer = input.required<BarterOfferResponse>();

  toCancel  = output<void>();
  proposed  = output<BarterTransactionResponse>();

  private fb          = inject(FormBuilder);
  private txService   = inject(BarterTransactionService);
  private cropService = inject(CropService);
  private assetService = inject(InventoryAssetService);

  saving      = signal(false);
  cropOptions  = signal<SelectOption[]>([]);
  assetOptions = signal<SelectOption[]>([]);

  readonly icons = ICONS_BARTER;

  readonly offerTypeOptions: SelectOption[] = [
    { value: 'CROP',  label: 'Grão / Saca' },
    { value: 'ASSET', label: 'Ativo' },
  ];

  form = this.fb.group({
    offerorGives:          ['CROP', Validators.required],
    offerorCropId:         [null as string | null],
    offerorCropQuantity:   [null as number | null],
    offerorAssetId:        [null as string | null],
    offerorAssetQuantity:  [null as number | null],
    offerorDeliveryDate:   ['', Validators.required],
    acceptorDeliveryDate:  ['', Validators.required],
    notes:                 [''],
  });

  totalRequestedValue = () =>
    this.offer().requestedItems?.reduce((s, i) => s + i.totalPriceBrl, 0) ?? 0;

  ngOnInit(): void {
    this.loadCrops();

    this.form.get('offerorGives')!.valueChanges.subscribe(type => {
      this.clearTypeFields();
      if (type === 'CROP') {
        this.form.get('offerorCropId')!.addValidators(Validators.required);
        this.form.get('offerorCropQuantity')!.addValidators([Validators.required, Validators.min(0.01)]);
      } else {
        this.form.get('offerorAssetId')!.addValidators(Validators.required);
        this.form.get('offerorAssetQuantity')!.addValidators([Validators.required, Validators.min(0.01)]);
      }
      this.form.updateValueAndValidity();
    });
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;

    const v = this.form.getRawValue();
    const request: ProposeTransactionRequest = {
      offerId:              this.offer().id,
      offerorGives:         v.offerorGives as 'CROP' | 'ASSET' as OfferType,
      offerorCropId:        v.offerorCropId ?? undefined,
      offerorCropQuantity:  v.offerorCropQuantity ?? undefined,
      offerorAssetId:       v.offerorAssetId ?? undefined,
      offerorAssetQuantity: v.offerorAssetQuantity ?? undefined,
      offerorDeliveryDate:  v.offerorDeliveryDate!,
      acceptorDeliveryDate: v.acceptorDeliveryDate!,
      notes:                v.notes ?? undefined,
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

  private clearTypeFields(): void {
    ['offerorCropId','offerorCropQuantity','offerorAssetId','offerorAssetQuantity']
      .forEach(c => {
        this.form.get(c)!.clearValidators();
        this.form.get(c)!.reset(null);
      });
  }

  private loadCrops(): void {
    this.cropService.list().subscribe(page => {
      const options = (page.content || []).map(c => ({ 
        value: c.id, 
        label: c.name 
      }));
      this.cropOptions.set(options);
    });
  }

}