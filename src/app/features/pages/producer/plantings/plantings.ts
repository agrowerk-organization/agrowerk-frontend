import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }           from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule }      from '@fortawesome/angular-fontawesome';
import { Page }                   from '@core/types/page/page';
import { PlantingService }        from '@core/services/planting.service';
import { PlantingResponse }       from '@core/types/planting/planting.response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { Paginator } from '@shared/components/paginator/paginator';
import { PlantingForm } from './planting-components/planting-form/planting-form';
import { PlantingCard } from './planting-components/planting-card/planting-card';
import { ICONS_PLANTINGS } from '@core/ui/icons/icons-producer/icons-plantings/icons-plantings';

@Component({
  selector: 'app-plantings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages, 
    BackButton,
    Paginator,
    PlantingCard,
    PlantingForm
  ],
  templateUrl: './plantings.html',
})
export class Plantings implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly router  = inject(Router);
  private readonly service = inject(PlantingService);

  readonly icons = ICONS_PLANTINGS;

  propertyId   = signal<string>('');
  propertyName = signal<string>('');

  prefillFieldId         = signal<string>('');
  prefillFieldName       = signal<string>('');
  prefillCropVarietyId   = signal<string>('');
  prefillCropVarietyName = signal<string>('');
  prefillCropName        = signal<string>('');

  loading     = signal(true);
  showForm    = signal(false);
  editTarget  = signal<PlantingResponse | null>(null);
  currentPage = signal(0);
  pageSize    = 10;

  page      = signal<Page<PlantingResponse> | null>(null);
  plantings = computed(() => this.page()?.content ?? []);
  hasItems  = computed(() => this.plantings().length > 0);
  total     = computed(() => this.page()?.totalPages ?? 0);

  formFieldId         = computed(() => this.editTarget()?.fieldId         ?? this.prefillFieldId());
  formFieldName       = computed(() => this.editTarget()?.fieldName       ?? this.prefillFieldName());
  formCropVarietyId   = computed(() => this.editTarget()?.cropVarietyId   ?? this.prefillCropVarietyId());
  formCropVarietyName = computed(() => this.editTarget()?.cropVarietyName ?? this.prefillCropVarietyName());
  formCropName        = computed(() => this.editTarget()?.cropName        ?? this.prefillCropName());

  ngOnInit(): void {
    const snap = this.route.snapshot;
    const parentSnap = this.route.parent?.snapshot;
  
    const id = snap.paramMap.get('propertyId') ?? parentSnap?.paramMap.get('propertyId') ?? '';
    this.propertyId.set(id);
  
    this.propertyName.set(snap.queryParamMap.get('propertyName') ?? 'Propriedade');
    this.prefillFieldId.set(snap.queryParamMap.get('fieldId') ?? '');
    this.prefillFieldName.set(snap.queryParamMap.get('fieldName') ?? '');
    this.prefillCropVarietyId.set(snap.queryParamMap.get('cropVarietyId') ?? '');
    this.prefillCropVarietyName.set(snap.queryParamMap.get('cropVarietyName') ?? '');
    this.prefillCropName.set(snap.queryParamMap.get('cropName') ?? '');
  
    if (snap.queryParamMap.get('openForm') === 'true') {
      this.showForm.set(true);
    }
  
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.service.findByProperty(this.propertyId(), this.currentPage(), this.pageSize).subscribe({
      next:  p  => { this.page.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.editTarget.set(null);
    this.showForm.set(true);
  }

  openEdit(planting: PlantingResponse): void {
    this.editTarget.set(planting);
    this.showForm.set(true);
  }
  goToActivity(planting: PlantingResponse): void {
    this.router.navigate(
      [`/producer/properties/${this.propertyId()}/plantings/${planting.id}/practices`],
      { queryParams: {
          cropVarietyName: planting.cropVarietyName,
          cropName:        planting.cropName,
          fieldName:       planting.fieldName,
          propertyName:    this.propertyName(),
      }}
    );
  }

  goToWarehouse(planting: PlantingResponse): void {
    this.router.navigate(
      [`/producer/properties/${this.propertyId()}/plantings/${planting.id}/warehouses`],
      { queryParams: { 
          propertyName:    this.propertyName(),
          cropName:        planting.cropName,
          cropVarietyName: planting.cropVarietyName
      }}
    );
  }
 
  goToHarvest(planting: PlantingResponse): void {
    this.router.navigate(
      [`/producer/properties/${this.propertyId()}/plantings/${planting.id}/harvests`],
      { queryParams: {
          cropVarietyName: planting.cropVarietyName,
          cropName:        planting.cropName,
          propertyName:    this.propertyName(),
      }}
    );
  }
  
  goToPrescription(planting: PlantingResponse): void {
    this.router.navigate(
      [`/producer/properties/${this.propertyId()}/plantings/${planting.id}/prescriptions`],
      { queryParams: {
          cropVarietyName: planting.cropVarietyName,
          cropName:        planting.cropName,
          fieldName:       planting.fieldName,
          propertyName:    this.propertyName(),
      }}
    );
  }
  
  goToForecast(planting: PlantingResponse): void {
    this.router.navigate(
      [`/producer/properties/${this.propertyId()}/plantings/${planting.id}/forecasts`],
      { queryParams: {
          cropVarietyName: planting.cropVarietyName,
          cropName:        planting.cropName,
          fieldName:       planting.fieldName,
          propertyName:    this.propertyName(),
      }}
    );
  }
  
  goToInputs(planting: PlantingResponse): void {
    this.router.navigate(
      [`/producer/properties/${this.propertyId()}/plantings/${planting.id}/planting-inputs`],
      { queryParams: {
          cropVarietyName: planting.cropVarietyName,
          cropName:        planting.cropName,
          fieldName:       planting.fieldName,
          propertyName:    this.propertyName(),
      }}
    );
  }

  onCancel(planting: PlantingResponse): void {
    this.service.cancelPlanting(planting.id).subscribe({
      next: updated => this.updateInList(updated),
    });
  }

  onSaved(saved: PlantingResponse): void {
    this.showForm.set(false);
    this.editTarget.set(null);
    const current = this.page();
    if (!current) { this.load(); return; }
    const idx = (current.content ?? []).findIndex(p => p.id === saved.id);
    const updated = idx >= 0
      ? (current.content ?? []).map(p => p.id === saved.id ? saved : p)
      : [saved, ...current.content ?? []];
    this.page.set({ ...current, content: updated });
  }

  private updateInList(updated: PlantingResponse): void {
    const current = this.page();
    if (!current) return;
    this.page.set({
      ...current,
      content: (current.content ?? []).map(p => p.id === updated.id ? updated : p),
    });
  }

  onPageChange(p: number): void {
    this.currentPage.set(p);
    this.load();
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editTarget.set(null);
    this.router.navigate([], { queryParams: { propertyName: this.propertyName() }, replaceUrl: true });
  }

  get backLink(): string {
    return `/producer/properties/${this.propertyId()}/fields`;
  }
}