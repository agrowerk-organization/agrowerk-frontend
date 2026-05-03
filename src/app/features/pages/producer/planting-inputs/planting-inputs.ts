import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlantingInputService } from '@core/services/planting-input.service';
import { Page }                       from '@core/types/page/page';
import { PlantingInputResponse } from '@core/types/planting-input/planting-input.response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { Paginator } from '@shared/components/paginator/paginator';
import { PlantingInputCard } from './planting-input-components/planting-input-card/planting-input-card';
import { PlantingInputForm } from './planting-input-components/planting-input-form/planting-input-form';
import { ICONS_PLANTING_INPUTS } from '@core/ui/icons/icons-producer/icons-planting-inputs/icons-planting-inputs';

@Component({
  selector: 'app-producer-planting-inputs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages,
    BackButton, 
    Paginator,
    PlantingInputCard, 
    PlantingInputForm,
  ],
  templateUrl: './planting-inputs.html',
})
export class ProducerPlantingInputsComponent implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(PlantingInputService);

  readonly icons = ICONS_PLANTING_INPUTS;

  plantingId      = signal<string>('');
  cropVarietyName = signal<string>('');
  cropName        = signal<string>('');
  fieldName       = signal<string>('');
  propertyName    = signal<string>('');

  loading     = signal(true);
  showForm    = signal(false);
  currentPage = signal(0);
  pageSize    = 10;

  page        = signal<Page<PlantingInputResponse> | null>(null);
  inputs      = computed(() => this.page()?.content ?? []);
  hasItems    = computed(() => this.inputs().length > 0);
  total       = computed(() => this.page()?.totalPages ?? 0);

  ngOnInit(): void {
    const snap = this.route.snapshot;
    this.plantingId.set(snap.paramMap.get('plantingId') ?? '');
    this.cropVarietyName.set(snap.queryParamMap.get('cropVarietyName') ?? '');
    this.cropName.set(snap.queryParamMap.get('cropName') ?? '');
    this.fieldName.set(snap.queryParamMap.get('fieldName') ?? '');
    this.propertyName.set(snap.queryParamMap.get('propertyName') ?? '');
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.service.findByPlanting(this.plantingId(), this.currentPage(), this.pageSize).subscribe({
      next:  p  => { this.page.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  onSaved(saved: PlantingInputResponse): void {
    this.showForm.set(false);
    const current = this.page();
    if (!current) { this.load(); return; }
    this.page.set({ ...current, content: [saved, ...current.content ?? []] });
  }

  onPageChange(p: number): void {
    this.currentPage.set(p);
    this.load();
  }

  get subtitle(): string {
    const parts = [this.cropName(), this.cropVarietyName(), this.fieldName(), this.propertyName()];
    return parts.filter(Boolean).join(' · ');
  }
}
