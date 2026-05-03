import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BatchResponse } from '@core/types/batch/batch.response';
import { BatchStatus, BatchStatusDesc, BatchStatusColor }  from '@core/enums/batch-status';
import { BatchReceiptStatus, BatchReceiptStatusDesc, BatchReceiptStatusColor } from '@core/enums/batch-status';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_BARTER } from '@core/ui/icons/icons-producer/icons-barter/icons-barter';
@Component({
  selector: 'app-batch-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages
  ],
  templateUrl: './batch-card.html',
})
export class BatchCard {
  batch   = input.required<BatchResponse>();

  toCancel  = output<BatchResponse>();
  receive = output<BatchResponse>();
  mode = input<'supplier' | 'producer'>('supplier');

  readonly icons = ICONS_BARTER;

  statusLabel = computed(() =>
    BatchStatusDesc[this.batch().status as BatchStatus] ?? this.batch().status
  );

  statusColor = computed(() =>
    BatchStatusColor[this.batch().status as BatchStatus] ?? 'text-primary border-primary'
  );

  receiptLabel = computed(() =>
    BatchReceiptStatusDesc[this.batch().receiptStatus as BatchReceiptStatus] ?? this.batch().receiptStatus
  );

  receiptColor = computed(() =>
    BatchReceiptStatusColor[this.batch().receiptStatus as BatchReceiptStatus] ?? 'text-primary border-primary'
  );

  canCancel = computed(() =>
    this.mode() === 'supplier' &&
    this.batch().status === BatchStatus.AVAILABLE &&
    this.batch().receiptStatus === BatchReceiptStatus.PENDING
  );

  canReceive = computed(() =>
    this.mode() === 'producer' &&
    this.batch().receiptStatus === BatchReceiptStatus.PENDING
  );

  get quantityRatio(): number {
    const init = this.batch().initialQuantity;
    if (!init) return 0;
    return (this.batch().currentQuantity / init) * 100;
  }
}