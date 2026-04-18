import { Component, input, output, inject, signal, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CropResponse } from '@core/types/crop/crop.response';
import { ICONS_ADMIN_CROPS } from '@core/ui/icons/icons-admin/icons-admin-crops/icons-admin-crops';
import { CROP_CATEGORIES } from '@core/types/crop/crop-categories';
import { CreateCropRequest } from '@core/types/crop/create-crop.request';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { NumberField } from '@shared/components/number-field/number-field';
import { SelectField } from '@shared/components/select-field/select-field';

@Component({
  selector: 'app-crop-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FontAwesomeModule,
    ButtonPages,
    NumberField,
    SelectField
  ],
  templateUrl: './crop-form.html'
})
export class CropForm {
  @ViewChild('photoInput') photoInput!: ElementRef<HTMLInputElement>;
  private fb = inject(FormBuilder);

  cropData = input<CropResponse | null>(null);
  saving = input<boolean>(false);
  saveError = input<string | null>(null);
  
  save = output<{ data: CreateCropRequest, file: File | null, isEdit: boolean }>();
  toCancel = output<void>();

  readonly icons = ICONS_ADMIN_CROPS;
  readonly categories = CROP_CATEGORIES;
  
  photoPreview = signal<string | null>(null);
  pendingPhoto = signal<File | null>(null);

  readonly form = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
    scientificName: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
    growthCycleDays: this.fb.control(0, { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
    cropCategory: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const data = this.cropData();
      if (data) {
        this.form.patchValue({
          name: data.name,
          scientificName: data.scientificName,
          growthCycleDays: data.growthCycleDays,
          cropCategory: data.cropCategory
        });
        this.photoPreview.set(data.originalUrl ?? null);
      } else {
        this.form.reset();
        this.photoPreview.set(null);
      }
    });
  }

  onPhotoChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.pendingPhoto.set(file);
    const reader = new FileReader();
    reader.onload = e => this.photoPreview.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid) return;
    this.save.emit({ 
      data: this.form.getRawValue(), 
      file: this.pendingPhoto(),
      isEdit: !!this.cropData()
    });
  }
}
