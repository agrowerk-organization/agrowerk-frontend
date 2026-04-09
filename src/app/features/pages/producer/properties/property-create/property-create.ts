import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertyService } from '@core/services/property.service';
import { StateService } from '@core/services/state.service';
import { StateResponse } from '@core/types/state/state.response';
import { CreatePropertyRequest } from '@core/types/property/create-property.request';
import { AddFarmUnitRequest } from '@core/types/property/add-farm-unit.request';
import { StepGeneral } from './steps/step-general/step-general';
import { StepAddress } from './steps/step-address/step-address';
import { StepUnits } from './steps/step-units/step-units';
import { StepPhoto } from './steps/step-photo/step-photo';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
import { UserValidators } from '@core/validators/user.validators';
@Component({
  selector: 'app-property-create',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StepGeneral,
    StepAddress,
    StepUnits,
    StepPhoto
  ],
  templateUrl: './property-create.html',
})
export class PropertyCreate implements OnInit {
  private propertyService = inject(PropertyService);
  private stateService    = inject(StateService);
  private router          = inject(Router);

  icons = ICONS_PROPERTY;

  readonly steps = [
    { label: 'Dados gerais', icon: this.icons.RULER_COMBINED    },
    { label: 'Endereço',     icon: this.icons.LOCATION_DOT       },
    { label: 'Talhões',      icon: this.icons.LAYER_GROUP  },
    { label: 'Foto',         icon: this.icons.CAMERA      },
  ];

  currentStep = signal(1);
  loading     = signal(false);
  createdId   = signal<string | null>(null);

  selectedFile   = signal<File | null>(null);
  previewUrl     = signal<string | null>(null);
  photoUploading = signal(false);

  states = signal<StateResponse[]>([]);

  generalForm = new FormGroup({
    name:              new FormControl('',   Validators.required),
    stateRegistration: new FormControl('',   Validators.required),
    ruralRegistration: new FormControl(''),
    stateId:           new FormControl('',   Validators.required),
    totalArea:         new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    plantedArea:       new FormControl<number | null>(null),
    mainCrop:          new FormControl(''),
    latitude:          new FormControl<number | null>(null),
    longitude:         new FormControl<number | null>(null),
  });

  addressForm = new FormGroup({
    rural:        new FormControl(false),
    code: new FormControl('', [Validators.required, UserValidators.cepFormat]),
    municipality: new FormControl('', Validators.required),
    locationName: new FormControl(''),
    street:       new FormControl(''),
    number:       new FormControl<number | null>(null),
    neighborhood: new FormControl(''),
    landmark:     new FormControl(''),
  });

  unitsForm = new FormGroup({ units: new FormArray([]) });

  get units(): FormArray { return this.unitsForm.get('units') as FormArray; }
  private generalFormStatus  = toSignal(this.generalForm.statusChanges, { initialValue: this.generalForm.status });
  private addressFormStatus  = toSignal(this.addressForm.statusChanges, { initialValue: this.addressForm.status });
  
  currentFormValid = computed(() => {
    switch (this.currentStep()) {
      case 1:  return this.generalFormStatus()  === 'VALID';
      case 2:  return this.addressFormStatus()  === 'VALID';
      case 3:  return true;
      case 4:  return true;
      default: return false;
    }
  });

  ngOnInit() {
    this.stateService.listAll().subscribe(s => this.states.set(s));
  }

  next() {
    if (this.currentStep() === 3) { this.submit(); return; }
    this.currentStep.update(s => s + 1);
  }

  back() {
    this.currentStep.update(s => Math.max(1, s - 1));
  }

  submit() {
    if (this.loading()) return;
    this.loading.set(true);

    const g = this.generalForm.value;
    const a = this.addressForm.value;

    const unitsPayload: AddFarmUnitRequest[] = this.units.controls.map(ctrl => {
      const v = ctrl.value;
      return {
        name: v.name,
        area: v.area,
        address: {
          rural:        v.rural ?? false,
          code:         v.code,
          municipality: v.municipality,
          locationName: v.locationName  || undefined,
          street:       v.street        || undefined,
          number:       v.number        || undefined,
          neighborhood: v.neighborhood  || undefined,
          landmark:     v.landmark      || undefined,
        },
      };
    });

    const payload: CreatePropertyRequest = {
      name:              g.name!,
      stateRegistration: g.stateRegistration!,
      ruralRegistration: g.ruralRegistration  || undefined,
      stateId:           g.stateId!,
      totalArea:         g.totalArea!,
      plantedArea:       g.plantedArea        || undefined,
      mainCrop:          g.mainCrop           || undefined,
      latitude:          g.latitude           || undefined,
      longitude:         g.longitude          || undefined,
      address: {
        rural:        a.rural ?? false,
        code:         a.code!,
        municipality: a.municipality!,
        locationName: a.locationName  || undefined,
        street:       a.street        || undefined,
        number:       a.number        || undefined,
        neighborhood: a.neighborhood  || undefined,
        landmark:     a.landmark      || undefined,
      },
      units: unitsPayload.length ? unitsPayload : undefined,
    };

    this.propertyService.create(payload).subscribe({
      next: res => {
        this.createdId.set(res.id);
        this.loading.set(false);
        this.currentStep.set(4);
      },
      error: () => this.loading.set(false),
    });
  }

  onFileSelected(file: File | null) { 
    if (!file) {
      this.selectedFile.set(null);
      this.previewUrl.set('');
      return;
    }
  
    this.selectedFile.set(file);
  
    const reader = new FileReader();
    reader.onload = e => this.previewUrl.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  uploadPhoto() {
    const id   = this.createdId();
    const file = this.selectedFile();
    if (!id || !file) return;

    this.photoUploading.set(true);
    this.propertyService.uploadPhoto(id, file).subscribe({
      next:  () => { this.photoUploading.set(false); this.finish(); },
      error: () => { this.photoUploading.set(false); this.finish(); },
    });
  }

  skipPhoto() {
    this.finish();
  }

  private finish() {
    this.router.navigate(['/producer/properties']);
  }
}