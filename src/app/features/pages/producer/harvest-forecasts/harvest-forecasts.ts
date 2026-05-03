import {
Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { Paginator } from '@shared/components/paginator/paginator';
import { HarvestForecastService } from '@core/services/harvest-forecast.service';
import { HarvestForecastResponse } from '@core/types/harvest-forecast/harvest-forecast.response';
import { HarvestForecastCard } from './harvest-forecast-components/harvest-forecast-card/harvest-forecast-card';
import { HarvestForecastForm } from './harvest-forecast-components/harvest-forecast-form/harvest-forecast-form';
import { Page }     from '@core/types/page/page';
import { ICONS_HARVEST_FORECASTS } from '@core/ui/icons/icons-producer/icons-harvest-forecasts/icons-harvest-forecasts';
  
@Component({
    selector: 'app-producer-harvest-forecasts',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CommonModule, 
      FontAwesomeModule,
      ButtonPages, 
      BackButton, 
      Paginator,
      HarvestForecastCard, 
      HarvestForecastForm,
    ],
    templateUrl: './harvest-forecasts.html',
})
export class HarvestForecasts implements OnInit {
    private readonly route   = inject(ActivatedRoute);
    private readonly service = inject(HarvestForecastService);
  
    readonly icons = ICONS_HARVEST_FORECASTS;
  
    plantingId      = signal<string>('');
    cropVarietyName = signal<string>('');
    cropName        = signal<string>('');
    fieldName       = signal<string>('');
    propertyName    = signal<string>('');
  
    loading     = signal(true);
    showForm    = signal(false);
    editTarget  = signal<HarvestForecastResponse | null>(null);
    currentPage = signal(0);
    pageSize    = 10;
  
    page      = signal<Page<HarvestForecastResponse> | null>(null);
    forecasts = computed(() => this.page()?.content ?? []);
    hasItems  = computed(() => this.forecasts().length > 0);
    total     = computed(() => this.page()?.totalPages ?? 0);
  
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
  
    openCreate(): void {
      this.editTarget.set(null);
      this.showForm.set(true);
    }
  
    openEdit(forecast: HarvestForecastResponse): void {
      this.editTarget.set(forecast);
      this.showForm.set(true);
    }
  
    onSaved(saved: HarvestForecastResponse): void {
      this.showForm.set(false);
      this.editTarget.set(null);
      const current = this.page();
      if (!current) { this.load(); return; }
      const idx = (current.content ?? []).findIndex(f => f.id === saved.id);
      const updated = idx >= 0
        ? (current.content ?? []).map(f => f.id === saved.id ? saved : f)
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
  
    get subtitle(): string {
      return [this.cropName(), this.cropVarietyName(), this.fieldName(), this.propertyName()]
        .filter(Boolean).join(' · ');
    }

}