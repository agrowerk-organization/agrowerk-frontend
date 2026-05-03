import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeasonService }     from '@core/services/season.service';
import { SeasonResponse } from '@core/types/season/season-response';
import { Page }                 from '@core/types/page/page';
import { ICONS_PRODUCER_SEASONS } from '@core/ui/icons/icons-producer/icons-seasons/icons-seasons';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { Paginator } from '@shared/components/paginator/paginator';
import { SeasonForm } from './season-components/season-form/season-form';
import { SeasonCard } from './season-components/season-card/season-card';
@Component({
  selector: 'app-seasons',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages,
    BackButton,
    Paginator,
    SeasonCard,
    SeasonForm
  ],
  templateUrl: './seasons.html',
})
export class Seasons implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(SeasonService);

  readonly icons = ICONS_PRODUCER_SEASONS;

  propertyId   = signal<string>('');
  propertyName = signal<string>('');

  loading     = signal(true);
  showForm    = signal(false);
  currentPage = signal(0);
  pageSize    = 10;

  page     = signal<Page<SeasonResponse> | null>(null);
  seasons  = computed(() => this.page()?.content ?? []);
  hasItems = computed(() => this.seasons().length > 0);
  total    = computed(() => this.page()?.totalPages ?? 0);

  ngOnInit(): void {
    const id   = this.route.snapshot.paramMap.get('propertyId') ?? '';
    const name = this.route.snapshot.queryParamMap.get('propertyName') ?? 'Propriedade';
    this.propertyId.set(id);
    this.propertyName.set(name);
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.service.findMySeasons(this.propertyId(), this.currentPage(), this.pageSize)
      .subscribe({
        next:  p  => { this.page.set(p); this.loading.set(false); },
        error: () => this.loading.set(false),
      });
  }

  onSaved(saved: SeasonResponse): void {
    this.showForm.set(false);
    const current = this.page();
    if (!current) { this.load(); return; }
    this.page.set({ ...current, content: [saved, ...current.content ?? []] });
  }

  onActivate(season: SeasonResponse): void {
    this.service.activateSeason(season.id).subscribe({
      next: updated => this.updateInList(updated),
    });
  }

  onFinish(season: SeasonResponse): void {
    this.service.finishSeason(season.id).subscribe({
      next: updated => this.updateInList(updated),
    });
  }

  private updateInList(updated: SeasonResponse): void {
    const current = this.page();
    if (!current) return;
    this.page.set({
      ...current,
      content: (current.content ?? []).map(s => s.id === updated.id ? updated : s),
    });
  }

  onPageChange(p: number): void {
    this.currentPage.set(p);
    this.load();
  }
}