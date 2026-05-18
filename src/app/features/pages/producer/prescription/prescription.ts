import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgronomicPrescriptionService } from '@core/services/agronomic-prescription.service';
import { PrescriptionResponse } from '@core/types/prescription/prescription.response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { PrescriptionCard } from './prescription-components/prescription-card/prescription-card';
import { PrescriptionForm } from './prescription-components/prescription-form/prescription-form';
import { ICONS_PRESCRIPTIONS } from '@core/ui/icons/icons-producer/icons-prescriptions/icons-prescription';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages, 
    BackButton,
    PrescriptionCard, 
    PrescriptionForm
  ],
  templateUrl: './prescription.html',
})
export class Prescription implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(AgronomicPrescriptionService);

  readonly icons = ICONS_PRESCRIPTIONS;

  plantingId      = signal<string>('');
  cropVarietyName = signal<string>('');
  cropName        = signal<string>('');
  fieldName       = signal<string>('');
  propertyName    = signal<string>('');

  loading       = signal(true);
  showForm      = signal(false);
  prescriptions = signal<PrescriptionResponse[]>([]);
  hasItems      = computed(() => this.prescriptions().length > 0);

  ngOnInit(): void {
    const snap = this.route.snapshot;
    const parentSnap = this.route.parent?.snapshot;
  
    const id = snap.paramMap.get('plantingId') ?? parentSnap?.paramMap.get('plantingId') ?? '';
    this.plantingId.set(id);
  
    const queryMap = snap.queryParamMap;
    const parentQueryMap = parentSnap?.queryParamMap;
  
    this.cropVarietyName.set(queryMap.get('cropVarietyName') ?? parentQueryMap?.get('cropVarietyName') ?? '');
    this.cropName.set(queryMap.get('cropName') ?? parentQueryMap?.get('cropName') ?? '');
    this.fieldName.set(queryMap.get('fieldName') ?? parentQueryMap?.get('fieldName') ?? '');
    
    this.propertyName.set(
      queryMap.get('propertyName') ?? 
      parentQueryMap?.get('propertyName') ?? 
      this.route.root.snapshot.queryParamMap.get('propertyName') ?? 
      ''
    );
    
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.service.findByPlanting(this.plantingId()).subscribe({
      next:  list => { this.prescriptions.set(list); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }

  onSaved(saved: PrescriptionResponse): void {
    this.showForm.set(false);
    this.prescriptions.update(list => [saved, ...list]);
  }

  onDeactivate(prescription: PrescriptionResponse): void {
    this.service.deactivate(prescription.id).subscribe({
      next: updated =>
        this.prescriptions.update(list =>
          list.map(p => p.id === updated.id ? updated : p)
        ),
    });
  }

  get subtitle(): string {
    return [this.cropName(), this.cropVarietyName(), this.fieldName(), this.propertyName()]
      .filter(Boolean).join(' · ');
  }

  get backLink(): string {
    const propertyId = this.route.snapshot.paramMap.get('propertyId') ?? this.route.parent?.snapshot.paramMap.get('propertyId') ?? '';
    return `/producer/properties/${propertyId}/plantings`;
  }
}