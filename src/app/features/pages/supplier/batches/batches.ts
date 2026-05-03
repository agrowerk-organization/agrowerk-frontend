import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faBoxes }   from '@fortawesome/free-solid-svg-icons';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { Paginator } from '@shared/components/paginator/paginator';
import { BatchCard } from '@features/common/batches/batches-components/batch-card/batch-card';
import { CreateBatchForm } from '@features/common/batches/batches-components/create-batch-form/create-batch-form';
import { BatchService }            from '@core/services/batch.service';
import { SupplierService }         from '@core/services/supplier.service';
import { BatchResponse }           from '@core/types/batch/batch.response';
import { Page }                    from '@core/types/page/page';

@Component({
  selector: 'app-supplier-batches',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages, 
    BackButton, 
    Paginator,
    BatchCard, 
    CreateBatchForm
  ],
  templateUrl: './batches.html',
})
export class Batches implements OnInit {
  private readonly batchService    = inject(BatchService);
  private readonly supplierService = inject(SupplierService);

  readonly icons = { PLUS: faPlus, BOXES: faBoxes };

  supplierId   = signal<string>('');
  supplierName = signal<string>('');

  loading     = signal(true);
  showForm    = signal(false);
  currentPage = signal(0);
  pageSize    = 10;

  page      = signal<Page<BatchResponse> | null>(null);
  batches   = computed(() => this.page()?.content ?? []);
  hasItems  = computed(() => this.batches().length > 0);
  total     = computed(() => this.page()?.totalPages ?? 0);

  ngOnInit(): void {
    this.supplierService.getMySupplier().subscribe({
      next: supplier => {
        this.supplierId.set(supplier.id);
        this.supplierName.set(supplier.fantasyName ?? supplier.corporateReason);
        this.load();
      },
      error: () => this.loading.set(false),
    });
  }

  private load(): void {
    this.loading.set(true);
    this.batchService.findBySupplier(this.supplierId(), this.currentPage(), this.pageSize).subscribe({
      next:  p  => { this.page.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  onSaved(saved: BatchResponse): void {
    this.showForm.set(false);
    const current = this.page();
    if (!current) { this.load(); return; }
    this.page.set({ ...current, content: [saved, ...current.content ?? []] });
  }

  onCancel(batch: BatchResponse): void {
    this.batchService.cancelBatch(batch.id).subscribe({
      next: updated => this.updateInList(updated),
    });
  }

  private updateInList(updated: BatchResponse): void {
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
}