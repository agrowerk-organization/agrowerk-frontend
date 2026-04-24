import { Component, inject, output, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { SelectField } from '@shared/components/select-field/select-field';
import { NumberField } from '@shared/components/number-field/number-field';
import { DateField } from '@shared/components/date-field/date-field';
import { SelectOption } from '@core/ui/types/select-option/select-option';
import { InputResponse } from '@core/types/input/input.response';
import { BarterOfferService } from '@core/services/barter-offer.service';
import { PropertyService } from '@core/services/property.service';
import { HarvestForecastService } from '@core/services/harvest-forecast.service';
import { InventoryAssetService } from '@core/services/inventory-assets.service';
import { InputService } from '@core/services/input.service';
import { SeasonService } from '@core/services/season.service';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { HarvestForecastResponse } from '@core/types/harvest/harvest-forecast.response';
import { PropertyResponse } from '@core/types/property/property.response';
import { OfferType } from '@core/enums/offer-type';
import { CreateBarterOfferRequest } from '@core/types/barter/create-barter-offer.request';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { ItemFormValue } from '@core/ui/types/barter/item-form-value';
import { UnitOfMeasure,UnitOfMeasureKey } from '@core/enums/unit-of-measure';
@Component({
  selector: 'app-create-offer-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonPages,
    SelectField,
    NumberField,
    DateField
  ],
  templateUrl: './create-offer-modal.html'
})
export class CreateOfferModal implements OnInit {

  toCancel = output<void>();
  created  = output<BarterOfferResponse>();

  private fb              = inject(FormBuilder);
  private offerService    = inject(BarterOfferService);
  private propertyService = inject(PropertyService);
  private forecastService = inject(HarvestForecastService);
  private assetService    = inject(InventoryAssetService);
  private inputService    = inject(InputService);
  private seasonService   = inject(SeasonService);

  saving  = signal(false);
  loading = signal(false);
  requestedTotal = signal<number>(0);

  properties   = signal<PropertyResponse[]>([]);
  forecasts    = signal<HarvestForecastResponse[]>([]);
  assetOptions = signal<SelectOption[]>([]);
  inputs = signal<InputResponse[]>([]);   
  inputOptions = computed(() =>           
    this.inputs().map(i => ({ value: i.id, label: i.name }))
  )

  propertyOptions = computed(() =>
    this.properties().map(p => ({ value: p.id, label: p.name }))
  );

  forecastOptions = computed(() =>
    this.forecasts().map(f => ({
      value: f.id,
      label: `${f.cropName} · ${f.estimatedQuantity} sc`
    }))
  );

  readonly icons = ICONS_BARTER;

  readonly offerTypeOptions: SelectOption[] = [
    { value: 'CROP',  label: 'Safra Futura (Grão)' },
    { value: 'ASSET', label: 'Ativo' },
  ];

  readonly requestedTypeOptions: SelectOption[] = [
    { value: 'ASSET', label: 'Insumos / Ativos' },
    { value: 'CROP',  label: 'Grão / Saca' },
  ];

  readonly unitOptions: SelectOption[] = Object.entries(UnitOfMeasure).map(([key, v]) => ({
      value: key,                                   
      label: `${v.description} (${v.abbreviation})` 
    }));

  form = this.fb.group({
    title:                ['', [Validators.required, Validators.maxLength(255)]],
    description:          [''],
    propertyId:           ['', Validators.required],
    offerType:            ['CROP', Validators.required],
    forecastId:           [null as string | null],
    offeredCropQuantity:  [null as number | null],
    estimatedHarvestDate: [null as string | null],
    offeredAssetId:       [null as string | null],
    offeredAssetQuantity: [null as number | null],
    requestedType:        ['ASSET', Validators.required],
    requestedDescription: [''],
    region:               [''],
    expiresAt:            ['', Validators.required],
    requestedItems:       this.fb.array([]),
  });

  get itemsArray(): FormArray {
    return this.form.get('requestedItems') as FormArray;
  }

  private newItemGroup(): FormGroup {
    return this.fb.group({
      inputId:       [null as string | null, Validators.required],
      quantity:      [null as number | null, [Validators.required, Validators.min(0.01)]],
      unitOfMeasure: [null as string | null, Validators.required],
      unitPriceBrl:  [{ value: null as number | null, disabled: true }, [Validators.required, Validators.min(0.01)]],
      notes:         [''],
    });
  }

  addItem(): void {
    const group = this.newItemGroup();
  
    group.get('inputId')!.valueChanges.subscribe(id => {
      if (!id) return;
      const input = this.inputs().find(i => i.id === id);
      if (input?.averagePurchasePrice) {
        group.get('unitPriceBrl')!.setValue(input.averagePurchasePrice);
      }
    });
  
    this.itemsArray.push(group);
  }

  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  ngOnInit(): void {
    this.loadProperties();
    this.loadAssets();
    this.loadInputs();

    this.form.get('offerType')!.valueChanges.subscribe(() => this.clearTypeFields());
    this.form.get('propertyId')!.valueChanges.subscribe(id => {
      if (id) this.loadForecasts(id);
    });
    this.form.get('forecastId')!.valueChanges.subscribe(id => {
      const dateControl = this.form.get('estimatedHarvestDate')!;
      
      if (!id) {
        dateControl.reset(null);
        dateControl.enable(); 
        return;
      }
    
      const forecast = this.forecasts().find(f => f.id === id);
      if (forecast) {
        this.form.patchValue({
          offeredCropQuantity:  forecast.estimatedQuantity,
          estimatedHarvestDate: forecast.forecastDate,
        });
        dateControl.disable(); 
      }
    });

    this.itemsArray.valueChanges.subscribe(() => {
      this.requestedTotal.set(this.calcTotal());
    });
  }


  submit(): void {
    if (this.form.invalid || this.saving()) return;

    const v        = this.form.getRawValue();
    const offerType = v.offerType as OfferType;

    const request: CreateBarterOfferRequest = {
      title:                v.title!,
      description:          v.description ?? undefined,
      propertyId:           v.propertyId!,
      offerType,
      harvestForecastId:    offerType === 'CROP' ? v.forecastId ?? undefined : undefined,
      offeredCropQuantity:  offerType === 'CROP' ? v.offeredCropQuantity ?? undefined : undefined,
      estimatedHarvestDate: offerType === 'CROP' ? v.estimatedHarvestDate ?? undefined : undefined,
      offeredAssetId:       offerType === 'ASSET' ? v.offeredAssetId ?? undefined : undefined,
      offeredAssetQuantity: offerType === 'ASSET' ? v.offeredAssetQuantity ?? undefined : undefined,
      requestedType:        v.requestedType as OfferType,
      requestedDescription: v.requestedDescription ?? undefined,
      requestedValue:       this.requestedTotal() > 0 ? this.requestedTotal() : undefined,
      region:               v.region ?? undefined,
      expiresAt:            v.expiresAt!,
      requestedItems: v.requestedItems?.length
        ? (v.requestedItems as ItemFormValue[]).map(i => ({
            inputId:       i.inputId!,
            quantity:      i.quantity!,
            unitOfMeasure: i.unitOfMeasure as UnitOfMeasureKey,
            unitPriceBrl:  i.unitPriceBrl!,
            notes:         i.notes || undefined,
          }))
        : undefined,
    };

    this.saving.set(true);
    this.offerService.createOffer(request).subscribe({
      next: res => {
        this.saving.set(false);
        this.created.emit(res);
      },
      error: () => this.saving.set(false),
    });
  }

  private loadProperties(): void {
    this.propertyService.findMyProperties().subscribe(page =>
      this.properties.set(page.content ?? [])
    );
  }

  private loadForecasts(propertyId: string): void {
    this.seasonService.findActiveSeason(propertyId).subscribe(season => {
      if (!season) return;
      this.forecastService.findByPropertyAndSeason(propertyId, season.id).subscribe(page =>
        this.forecasts.set(page.content ?? [])
      );
    });
  }

  private loadAssets(): void {
    this.assetService.getMyAssets().subscribe(page => {
      this.assetOptions.set(
        (page.content ?? [])
          .filter(a => a.approvedForBarter)
          .map(a => ({ value: a.id, label: `${a.name} · ${a.quantity} ${a.unit}` }))
      );
    });
  }

  private loadInputs(): void {
    this.inputService.findCatalog().subscribe(page => {
      this.inputs.set(
        (page.content ?? []))
    });
  }

  private clearTypeFields(): void {
    ['forecastId','offeredCropQuantity','estimatedHarvestDate',
     'offeredAssetId','offeredAssetQuantity'].forEach(c => {
      this.form.get(c)!.clearValidators();
      this.form.get(c)!.reset(null);
      this.form.get(c)!.enable();
    });
  }

  private calcTotal(): number {
    return this.itemsArray.controls.reduce((sum, group) => {
      const quantity = group.get('quantity')?.value;
      const unitPriceBrl = group.get('unitPriceBrl')?.value;
      return sum + (quantity ?? 0) * (unitPriceBrl ?? 0);
    }, 0);
  }
}