import { Component, input, output, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PropertyResponse } from '@core/types/property/property.response';
import { PropertyService } from '@core/services/property/property.service';
import { UpdateGeneral } from './steps/update-general/update-general';
import { UpdateAddress } from './steps/update-address/update-address';
import { UpdateUnits } from './steps/update-units/update-units';

@Component({
  selector: 'app-property-update-modal',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FontAwesomeModule,
    UpdateGeneral, UpdateAddressComponent, UpdateUnits,
  ],
  templateUrl: './property-update-modal.html',
})
export class PropertyUpdateModalComponent implements OnInit {
  private propertyService = inject(PropertyService);

  property = input.required<PropertyResponse>();
  updated  = output<PropertyResponse>();
  close    = output<void>();

  readonly icons = { XMARK: faXmark, CHECK: faCheck, SPINNER: faSpinner };

  readonly tabs = ['Geral', 'Endereço', 'Talhões'];
  activeTab = signal(0);
  loading   = signal(false);

  generalForm!: FormGroup;
  addressForm!: FormGroup;
  unitsForm!:   FormGroup;

  get units(): FormArray { return this.unitsForm.get('units') as FormArray; }

  ngOnInit() {
    const p = this.property();
    const a = p.address;

    this.generalForm = new FormGroup({
      name:              new FormControl(p.name),
      ruralRegistration: new FormControl(p.ruralRegistration ?? ''),
      totalArea:         new FormControl(p.totalArea),
      plantedArea:       new FormControl(p.plantedArea ?? null),
      mainCrop:          new FormControl(p.mainCrop ?? ''),
      latitude:          new FormControl(p.latitude ?? null),
      longitude:         new FormControl(p.longitude ?? null),
      isActive:          new FormControl(p.isActive),
    });

    this.addressForm = new FormGroup({
      rural:        new FormControl(a.rural),
      code:         new FormControl(a.code),
      municipality: new FormControl(a.municipality),
      locationName: new FormControl(a.locationName ?? ''),
      street:       new FormControl(a.street ?? ''),
      number:       new FormControl(a.number ?? null),
      neighborhood: new FormControl(a.neighborhood ?? ''),
      landmark:     new FormControl(a.landmark ?? ''),
    });

    const unitControls = (p.units ?? []).map(u => new FormGroup({
      name:         new FormControl(u.name, Validators.required),
      area:         new FormControl(u.area, [Validators.required, Validators.min(0.01)]),
      rural:        new FormControl(u.response?.rural ?? false),
      code:         new FormControl(u.response?.code ?? ''),
      municipality: new FormControl(u.response?.municipality ?? ''),
      locationName: new FormControl(u.response?.locationName ?? ''),
      street:       new FormControl(u.response?.street ?? ''),
      number:       new FormControl(u.response?.number ?? null),
      neighborhood: new FormControl(u.response?.neighborhood ?? ''),
      landmark:     new FormControl(u.response?.landmark ?? ''),
    }));

    this.unitsForm = new FormGroup({ units: new FormArray(unitControls) });
  }

  submit() {
    if (this.loading()) return;
    this.loading.set(true);

    const g = this.generalForm.value;
    const a = this.addressForm.value;

    const unitsPayload = this.units.controls.map(ctrl => {
      const v = ctrl.value;
      return {
        name: v.name,
        area: v.area,
        address: {
          rural: v.rural ?? false,
          code: v.code,
          municipality: v.municipality,
          locationName: v.locationName || undefined,
          street: v.street || undefined,
          number: v.number || undefined,
          neighborhood: v.neighborhood || undefined,
          landmark: v.landmark || undefined,
        }
      };
    });

    const payload = {
      name:              g.name || undefined,
      ruralRegistration: g.ruralRegistration || undefined,
      totalArea:         g.totalArea || undefined,
      plantedArea:       g.plantedArea || undefined,
      mainCrop:          g.mainCrop || undefined,
      latitude:          g.latitude || undefined,
      longitude:         g.longitude || undefined,
      isActive:          g.isActive,
      address: {
        rural:        a.rural ?? false,
        code:         a.code,
        municipality: a.municipality,
        locationName: a.locationName || undefined,
        street:       a.street || undefined,
        number:       a.number || undefined,
        neighborhood: a.neighborhood || undefined,
        landmark:     a.landmark || undefined,
      },
      units: unitsPayload.length ? unitsPayload : undefined,
    };

    this.propertyService.update(this.property().id, payload).subscribe({
      next: res  => { this.loading.set(false); this.updated.emit(res); },
      error: ()  => this.loading.set(false),
    });
  }
}