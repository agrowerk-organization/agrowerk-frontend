import {
  Component, input, output, signal, OnInit,
  inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgronomicPrescriptionService } from '@core/services/agronomic-prescription.service';
import { InputService } from '@core/services/input.service';
import { PrescriptionResponse }         from '@core/types/prescription/prescription.response';
import { InputResponse }                from '@core/types/input/input.response';
import { UnitOfMeasure, UnitOfMeasureKey } from '@core/enums/unit-of-measure';
import { ButtonPages }  from '@shared/components/buttons/button-pages/button-pages';
import { NumberField } from '@shared/components/number-field/number-field';
import { SelectField } from '@shared/components/select-field/select-field';
import { ICONS_PRESCRIPTIONS } from '@core/ui/icons/icons-producer/icons-prescriptions/icons-prescription';
import { CreatePrescriptionItemRequest } from '@core/types/prescription/create-prescription-item.request';
import { DateField } from "@shared/components/date-field/date-field";

@Component({
  selector: 'app-prescription-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonPages,
    NumberField,
    SelectField,
    DateField
],
  templateUrl: './prescription-form.html'
})
export class PrescriptionForm implements OnInit {
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(AgronomicPrescriptionService);
  private readonly inputService = inject(InputService);

  plantingId      = input.required<string>();
  cropVarietyName = input<string>('');
  cropName        = input<string>('');

  saved    = output<PrescriptionResponse>();
  toCancel = output<void>();

  saving       = signal(false);
  inputs       = signal<InputResponse[]>([]);
  documentFile = signal<File | null>(null);
  docFileName  = signal<string>('');

  readonly icons = ICONS_PRESCRIPTIONS;

  readonly unitOptions = Object.keys(UnitOfMeasure).map(key => ({
    value: key,
    label: `${UnitOfMeasure[key as UnitOfMeasureKey].description} (${UnitOfMeasure[key as UnitOfMeasureKey].abbreviation})`,
  }));

  form = this.fb.group({
    agronomistName: ['', Validators.required],
    agronomistCrea: ['', [Validators.required, Validators.maxLength(20)]],
    issuedAt:       ['', Validators.required],
    validUntil:     ['', Validators.required],
    items: this.fb.array([this.buildItem()]),
  });

  get itemsArray(): FormArray { return this.form.get('items') as FormArray; }
  get itemGroups(): FormGroup[] { return this.itemsArray.controls as FormGroup[]; }

  ngOnInit(): void {
    this.inputService.findCatalog({ page: 0, size: 100 }).subscribe({
      next: page => this.inputs.set(page.content ?? []),
    });
  }

  buildItem(): FormGroup {
    return this.fb.group({
      inputId:            ['', Validators.required],
      authorizedQuantity: [null as number | null, [Validators.required, Validators.min(0.001)]],
      unit:               [null as UnitOfMeasureKey | null, Validators.required],
      usageInstructions:  [''],
    });
  }

  addItem(): void    { this.itemsArray.push(this.buildItem()); }
  removeItem(i: number): void {
    if (this.itemsArray.length > 1) this.itemsArray.removeAt(i);
  }

  onDocumentChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.documentFile.set(file);
      this.docFileName.set(file.name);
    }
  }

  inputName(inputId: string): string {
    return this.inputs().find(i => i.id === inputId)?.name ?? 'Selecione...';
  }

  submit(): void {
    if (this.form.invalid || !this.documentFile() || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();

    const formValues = v; 

    this.service.createPrescription({
      plantingId:     this.plantingId(),
      agronomistName: formValues.agronomistName ?? '',
      agronomistCrea: formValues.agronomistCrea ?? '',
      issuedAt:       formValues.issuedAt ?? '',
      validUntil:     formValues.validUntil ?? '',
      items: (formValues.items as unknown as CreatePrescriptionItemRequest[] ?? []).map((item) => ({
          inputId:            item.inputId,
          authorizedQuantity: item.authorizedQuantity,
          unitOfMeasure:      item.unitOfMeasure, 
          usageInstructions:  item.usageInstructions ?? undefined,
        })),
      },
      this.documentFile()!
    ).subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}