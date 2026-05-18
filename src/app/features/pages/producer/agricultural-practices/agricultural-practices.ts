import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgriculturalPracticeService } from '@core/services/agricultural-practice.service';
import { AgriculturalPracticeResponse } from '@core/types/agricultural-practice/agricultural-pratice.response';
import { Page } from '@core/types/page/page';
import { PracticeType, PracticeTypeDesc } from '@core/enums/agricultural-practice-type';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { Paginator } from '@shared/components/paginator/paginator';
import { AgriculturalPracticeCard } from './agricultural-practice-components/agricultural-practice-card/agricultural-practice-card';
import { AgriculturalPracticeForm } from './agricultural-practice-components/agricultural-practice-form/agricultural-practice-form';
import { ICONS_AGRICULTURAL_PRACTICES } from '@core/ui/icons/icons-producer/icons-agricultural-practices/icons-agricultural-practices';
import { SearchBar } from '@shared/components/search-filter/search-bar';
import { SearchFilter } from '@core/ui/types/search-filter/search-filter';
@Component({
  selector: 'app-agricultural-practices',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages,
    BackButton,
    Paginator,
    SearchBar,
    AgriculturalPracticeCard,
    AgriculturalPracticeForm
  ],
  templateUrl: './agricultural-practices.html',
})
export class AgriculturalPractices implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(AgriculturalPracticeService);

  readonly icons = ICONS_AGRICULTURAL_PRACTICES;

  plantingId      = signal<string>('');
  cropVarietyName = signal<string>('');
  cropName        = signal<string>('');
  fieldName       = signal<string>('');
  propertyName    = signal<string>('');

  loading      = signal(true);
  showForm     = signal(false);
  activeFilter = signal<PracticeType | null>(null);
  currentPage  = signal(0);
  pageSize     = 10;
  totalCost    = signal<number>(0);

  page      = signal<Page<AgriculturalPracticeResponse> | null>(null);
  practices = computed(() => this.page()?.content ?? []);
  hasItems  = computed(() => this.practices().length > 0);
  total     = computed(() => this.page()?.totalPages ?? 0);

  readonly filterItems: SearchFilter[] = Object.values(PracticeType).map(v => ({
    key: v as string,
    label: PracticeTypeDesc[v],
  }));
  
  onSearch(term: string): string {
    return term;
  }

  onFilterChange(key: string | null): void {
    this.selectFilter(key as PracticeType | null);
  }

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
      'Propriedade'
    );

    this.load();
    this.loadTotalCost();
  }

  private load(): void {
    this.loading.set(true);
    const type = this.activeFilter();
    const req$ = type
      ? this.service.findByType(this.plantingId(), type, this.currentPage(), this.pageSize)
      : this.service.findByPlanting(this.plantingId(), this.currentPage(), this.pageSize);

    req$.subscribe({
      next:  p  => { this.page.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  private loadTotalCost(): void {
    this.service.getTotalCost(this.plantingId()).subscribe({
      next: cost => this.totalCost.set(cost),
    });
  }

  selectFilter(type: PracticeType | null): void {
    this.activeFilter.set(type);
    this.currentPage.set(0);
    this.load();
  }

  onSaved(saved: AgriculturalPracticeResponse): void {
    this.showForm.set(false);
    const current = this.page();
    if (!current) { this.load(); return; }
    this.page.set({ ...current, content: [saved, ...current.content ?? []] });
    this.loadTotalCost();
  }

  onPageChange(p: number): void {
    this.currentPage.set(p);
    this.load();
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