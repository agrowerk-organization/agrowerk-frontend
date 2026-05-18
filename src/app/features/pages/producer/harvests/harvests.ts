import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faWheatAwn } from '@fortawesome/free-solid-svg-icons';
import { HarvestService } from '@core/services/harvest.service';
import { HarvestResponse } from '@core/types/harvest/harvest.response';
import { Page } from '@core/types/page/page';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { Paginator } from '@shared/components/paginator/paginator';
import { HarvestCard } from './harvest-components/harvest-card/harvest-card';
import { HarvestForm } from './harvest-components/harvest-form/harvest-form';

@Component({
  selector: 'app-producer-harvests',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages,
    BackButton, 
    Paginator,
    HarvestCard, 
    HarvestForm,
  ],
  templateUrl: './harvests.html',
})
export class Harvests implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(HarvestService);

  readonly icons = { PLUS: faPlus, WHEAT: faWheatAwn };

  propertyId      = signal<string>('');
  propertyName    = signal<string>('');
  plantingId      = signal<string>('');
  cropVarietyName = signal<string>('');
  cropName        = signal<string>('');

  loading     = signal(true);
  showForm    = signal(false);
  currentPage = signal(0);
  pageSize    = 10;

  page      = signal<Page<HarvestResponse> | null>(null);
  harvests  = computed(() => this.page()?.content ?? []);
  hasItems  = computed(() => this.harvests().length > 0);
  total     = computed(() => this.page()?.totalPages ?? 0);

  ngOnInit(): void {
    const snap = this.route.snapshot;
    const parentSnap = this.route.parent?.snapshot;

    const pId = snap.paramMap.get('propertyId') ?? parentSnap?.paramMap.get('propertyId') ?? '';
    const plId = snap.paramMap.get('plantingId') ?? parentSnap?.paramMap.get('plantingId') ?? '';
    this.propertyId.set(pId);
    this.plantingId.set(plId);

    const queryMap = snap.queryParamMap;
    const parentQueryMap = parentSnap?.queryParamMap;

    this.cropVarietyName.set(queryMap.get('cropVarietyName') ?? parentQueryMap?.get('cropVarietyName') ?? '');
    this.cropName.set(queryMap.get('cropName') ?? parentQueryMap?.get('cropName') ?? '');
    
    this.propertyName.set(
      queryMap.get('propertyName') ?? 
      parentQueryMap?.get('propertyName') ?? 
      this.route.root.snapshot.queryParamMap.get('propertyName') ?? 
      'Propriedade'
    );

    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.service.findByProperty(this.propertyId(), this.currentPage(), this.pageSize).subscribe({
      next:  p  => { this.page.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  onSaved(saved: HarvestResponse): void {
    this.showForm.set(false);
    const current = this.page();
    if (!current) { this.load(); return; }
    this.page.set({ ...current, content: [saved, ...current.content ?? []] });
  }

  onFinalize(harvest: HarvestResponse): void {
    this.service.finalizeHarvest(harvest.id).subscribe({
      next: updated => {
        const current = this.page();
        if (!current) return;
        this.page.set({
          ...current,
          content: (current.content ?? []).map(h => h.id === updated.id ? updated : h),
        });
      },
    });
  }

  onPageChange(p: number): void {
    this.currentPage.set(p);
    this.load();
  }

  get backLink(): string {
    return `/producer/properties/${this.propertyId()}/plantings`;
  }
}