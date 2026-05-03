import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }       from '@angular/common';
import { ActivatedRoute }     from '@angular/router';
import { FontAwesomeModule }  from '@fortawesome/angular-fontawesome';
import { BatchService } from '@core/services/batch.service';
import { BatchResponse } from '@core/types/batch/batch.response';
import { Page }                    from '@core/types/page/page';
import { BatchCard } from '@features/common/batches/batches-components/batch-card/batch-card';
import { ReceiveBatchForm } from '@features/common/batches/batches-components/receive-batch-form/receive-batch-form';
import { BackButton } from '@shared/components/back-button/back-button';
import { Paginator } from '@shared/components/paginator/paginator';
import { ICONS_BARTER } from '@core/ui/icons/icons-producer/icons-barter/icons-barter';

@Component({
  selector: 'app-producer-batches',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FontAwesomeModule,
    BackButton, 
    Paginator,
    BatchCard,
    ReceiveBatchForm
  ],
  templateUrl: './batches.html'
})
export class Batches implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(BatchService);

  readonly icons = ICONS_BARTER;

  propertyId   = signal<string>('');
  propertyName = signal<string>('');
  plantingId   = signal<string>('');

  loading       = signal(true);
  receiveTarget = signal<BatchResponse | null>(null);
  currentPage   = signal(0);
  pageSize      = 10;

  page     = signal<Page<BatchResponse> | null>(null);
  batches  = computed(() => this.page()?.content ?? []);
  hasItems = computed(() => this.batches().length > 0);
  total    = computed(() => this.page()?.totalPages ?? 0);

  ngOnInit(): void {
    const snap = this.route.snapshot;
    this.propertyId.set(snap.paramMap.get('propertyId') ?? '');
    this.propertyName.set(snap.queryParamMap.get('propertyName') ?? 'Propriedade');
    this.plantingId.set(snap.queryParamMap.get('plantingId') ?? '');
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.service.findByProperty(this.propertyId(), this.currentPage(), this.pageSize).subscribe({
      next:  p  => { this.page.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openReceive(batch: BatchResponse): void {
    this.receiveTarget.set(batch);
  }

  onReceived(updated: BatchResponse): void {
    this.receiveTarget.set(null);
    const current = this.page();
    if (!current) return;
    this.page.set({
      ...current,
      content: (current.content ?? []).map(b => b.id === updated.id ? updated : b),
    });
  }

  onPageChange(p: number): void {
    this.currentPage.set(p);
    this.load();
  }

  get backLink(): string {
    return `/producer/planting-inputs/${this.plantingId()}`;
  }
}