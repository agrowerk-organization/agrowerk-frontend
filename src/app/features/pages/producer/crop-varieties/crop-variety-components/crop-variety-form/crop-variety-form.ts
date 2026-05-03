import {
  Component, input, output, signal, computed,
  OnInit, inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CropVarietyService } from '@core/services/crop-variety.service';
import { CropService }           from '@core/services/crop.service';
import { CropVarietyResponse } from '@core/types/crop-variety/crop-variety.response';
import { CropResponse }          from '@core/types/crop/crop.response';
import { BrazilRegion, BrazilRegionDesc } from '@core/enums/brazil-region';
import { ICONS_CROP_VARIETIES } from '@core/ui/icons/icons-producer/icons-crop-varieties/icons-crop-varieties';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { SelectField } from '@shared/components/select-field/select-field';

@Component({
  selector: 'app-crop-variety-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FontAwesomeModule,
    ButtonPages,
    SelectField
  ],
  templateUrl: './crop-variety-form.html'
})
export class CropVarietyForm implements OnInit {
  private readonly fb             = inject(FormBuilder);
  private readonly service        = inject(CropVarietyService);
  private readonly cropService    = inject(CropService);

  varietyData = input<CropVarietyResponse | null>(null);
  saved       = output<CropVarietyResponse>();
  toCancel    = output<void>();

  saving       = signal(false);
  crops        = signal<CropResponse[]>([]);
  selectedCrop = signal<CropResponse | null>(null);
  cropPickerOpen = signal(false);

  readonly icons = ICONS_CROP_VARIETIES;

  readonly regionOptions = Object.values(BrazilRegion).map(v => ({
    value: v,
    label: BrazilRegionDesc[v],
  }));

  readonly isEdit = computed(() => this.varietyData() != null);

  form = this.fb.group({
    cropId:      ['', Validators.required],
    name:        ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', Validators.maxLength(200)],
    region:      [null as BrazilRegion | null],
  });

  ngOnInit(): void {
    this.cropService.list(0, 100).subscribe({
      next: page => this.crops.set(page.content ?? []),
    });

    const d = this.varietyData();
    if (d) {
      this.form.patchValue({
        cropId:      d.cropId,
        name:        d.name,
        description: d.description,
        region:      d.region as BrazilRegion,
      });
      // no edit, cropId não muda
      this.form.get('cropId')?.disable();
    }
  }

  selectCrop(crop: CropResponse): void {
    this.selectedCrop.set(crop);
    this.form.get('cropId')?.setValue(crop.id);
    this.cropPickerOpen.set(false);
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();

    const req$ = this.isEdit()
      ? this.service.updateVariety(this.varietyData()!.id, {
          name:        v.name!,
          description: v.description ?? undefined,
          region:      v.region ?? undefined,
        })
      : this.service.createVariety({
          cropId:      v.cropId!,
          name:        v.name!,
          description: v.description ?? undefined,
          region:      v.region ?? undefined,
        });

    req$.subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}
