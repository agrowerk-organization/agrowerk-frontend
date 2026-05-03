import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }           from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule }      from '@fortawesome/angular-fontawesome';
import { CropVarietyService } from '@core/services/crop-variety.service';
import { CropService }               from '@core/services/crop.service';
import { CropVarietyResponse } from '@core/types/crop-variety/crop-variety.response';
import { CropResponse } from '@core/types/crop/crop.response';
import { Page }                      from '@core/types/page/page';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { Paginator } from '@shared/components/paginator/paginator';
import { CropVarietyCard } from './crop-variety-components/crop-variety-card/crop-variety-card';
import { CropVarietyForm } from './crop-variety-components/crop-variety-form/crop-variety-form';
import { ICONS_CROP_VARIETIES } from '@core/ui/icons/icons-producer/icons-crop-varieties/icons-crop-varieties';
import { BackButton } from '@shared/components/back-button/back-button';

@Component({
  selector: 'app-crop-varieties',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages,
    BackButton,
    Paginator,
    CropVarietyCard,
    CropVarietyForm
  ],
  templateUrl: './crop-varieties.html',
})
export class CropVarieties implements OnInit {
  private readonly route       = inject(ActivatedRoute);
  private readonly router      = inject(Router);
  private readonly service     = inject(CropVarietyService);
  private readonly cropService = inject(CropService);

  readonly icons = ICONS_CROP_VARIETIES;

  fieldId      = signal<string>('');
  fieldName    = signal<string>('');
  propertyId   = signal<string>('');
  propertyName = signal<string>('');

  crops        = signal<CropResponse[]>([]);
  selectedCrop = signal<CropResponse | null>(null);
  loadingCrops = signal(true);

  loading     = signal(false);
  showForm    = signal(false);
  editTarget  = signal<CropVarietyResponse | null>(null);
  currentPage = signal(0);
  pageSize    = 10;

  page      = signal<Page<CropVarietyResponse> | null>(null);
  varieties = computed(() => this.page()?.content ?? []);
  hasItems  = computed(() => this.varieties().length > 0);
  total     = computed(() => this.page()?.totalPages ?? 0);

  ngOnInit(): void {
    const snap = this.route.snapshot;
    this.fieldId.set(snap.paramMap.get('fieldId') ?? '');
    this.fieldName.set(snap.queryParamMap.get('fieldName') ?? 'Talhão');
    this.propertyId.set(snap.queryParamMap.get('propertyId') ?? '');
    this.propertyName.set(snap.queryParamMap.get('propertyName') ?? 'Propriedade');

    this.cropService.list(0, 100).subscribe({
      next:  page => { this.crops.set(page.content ?? []); this.loadingCrops.set(false); },
      error: ()   => this.loadingCrops.set(false),
    });
  }

  selectCrop(crop: CropResponse): void {
    this.selectedCrop.set(crop);
    this.currentPage.set(0);
    this.page.set(null);
    this.load();
  }

  private load(): void {
    const crop = this.selectedCrop();
    if (!crop) return;

    this.loading.set(true);
    this.service.findByCrop(crop.id, this.currentPage(), this.pageSize).subscribe({
      next:  p  => { this.page.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.editTarget.set(null);
    this.showForm.set(true);
  }

  openEdit(variety: CropVarietyResponse): void {
    this.editTarget.set(variety);
    this.showForm.set(true);
  }

  goToPlanting(variety: CropVarietyResponse): void {
    this.router.navigate(['/producer/plantings', this.propertyId], {
      queryParams: {
        fieldId:         this.fieldId(),
        fieldName:       this.fieldName(),
        propertyId:      this.propertyId(),
        propertyName:    this.propertyName(),
        cropVarietyId:   variety.id,
        cropVarietyName: variety.name,
        cropName:        variety.cropName,
      },
    });
  }

  onSaved(saved: CropVarietyResponse): void {
    this.showForm.set(false);
    this.editTarget.set(null);
    const current = this.page();
    if (!current) { this.load(); return; }
    const idx = (current.content ?? []).findIndex(v => v.id === saved.id);
    const updated = idx >= 0
      ? (current.content ?? []).map(v => v.id === saved.id ? saved : v)
      : [saved, ...current.content ?? []];
    this.page.set({ ...current, content: updated });
  }

  onPageChange(p: number): void {
    this.currentPage.set(p);
    this.load();
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editTarget.set(null);
  }

  get backLink(): string {
    return `/producer/fields/${this.propertyId()}`;
  }
}