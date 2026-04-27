import { Component, computed, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { OfferType } from '@core/enums/offer-type';
import { TransactionStatus } from '@core/enums/transaction-status';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule, 
    ButtonPages, 
    DatePipe
  ],
  templateUrl: './transaction-card.html'
})
export class TransactionCard {
  transaction   = input.required<BarterTransactionResponse>();
  currentUserId = input.required<string>();

  accept       = output<BarterTransactionResponse>();
  decline      = output<string>();
  toCancel     = output<string>();
  sign         = output<BarterTransactionResponse>();
  viewContract = output<string>();

  readonly icons  = ICONS_BARTER;
  readonly type   = OfferType;
  readonly txStatus = TransactionStatus;

  isOfferor = computed(() =>
    this.transaction().offerorId === this.currentUserId()
  );

  roleLabel = computed(() =>
    this.isOfferor() ? 'Ofertante' : 'Aceitante'
  );

  counterpartName = computed(() =>
    this.isOfferor()
      ? this.transaction().acceptorName
      : this.transaction().offerorName
  );

  myDeliveryLabel = computed(() => {
    const tx = this.transaction();
    if (this.isOfferor()) {
      if (tx.offerorGives === OfferType.CROP)
        return `${tx.offerorCropQuantity} sc · ${tx.offerorCropName ?? '—'}`;
      return tx.offerorInputName
        ? `${tx.offerorInputName} · Lote ${tx.offerorBatchNumber}`
        : tx.offerorAssetName ?? '—';
    } else {
      if (tx.acceptorGives === OfferType.CROP)
        return `${tx.acceptorCropQuantity} sc · ${tx.acceptorCropName ?? '—'}`;
      return 'Insumos acordados';
    }
  });

  myReceiveLabel = computed(() => {
    const tx = this.transaction();
    if (this.isOfferor()) {
      if (tx.acceptorGives === OfferType.CROP)
        return `${tx.acceptorCropQuantity} sc · ${tx.acceptorCropName ?? '—'}`;
      return 'Insumos acordados';
    } else {
      if (tx.offerorGives === OfferType.CROP)
        return `${tx.offerorCropQuantity} sc · ${tx.offerorCropName ?? '—'}`;
      return tx.offerorInputName
        ? `${tx.offerorInputName} · Lote ${tx.offerorBatchNumber}`
        : tx.offerorAssetName ?? '—';
    }
  });

  myDeliveryDate = computed(() =>
    this.isOfferor()
      ? this.transaction().offerorDeliveryDate
      : this.transaction().acceptorDeliveryDate
  );

  myReceiveDate = computed(() =>
    this.isOfferor()
      ? this.transaction().acceptorDeliveryDate
      : this.transaction().offerorDeliveryDate
  );


  statusLabel = computed(() => {
    const map: Record<TransactionStatus, string> = {
      [TransactionStatus.PENDING]:     'Aguardando',
      [TransactionStatus.CONFIRMED]:   'Confirmada',
      [TransactionStatus.IN_PROGRESS]: 'Em andamento',
      [TransactionStatus.COMPLETED]:   'Concluída',
      [TransactionStatus.CANCELLED]:   'Cancelada',
      [TransactionStatus.DISPUTED]:    'Disputada',
    };
    return map[this.transaction().status] ?? this.transaction().status;
  });

  statusBadgeClass = computed(() => {
    const map: Record<TransactionStatus, string> = {
      [TransactionStatus.PENDING]:     'bg-amber-950 text-amber-400 border border-amber-500/50',
      [TransactionStatus.CONFIRMED]:   'bg-blue-950 text-blue-400 border border-blue-500/50',
      [TransactionStatus.IN_PROGRESS]: 'bg-primary/10 text-primary border border-primary/30',
      [TransactionStatus.COMPLETED]:   'bg-green-950 text-green-400 border border-green-500/50',
      [TransactionStatus.CANCELLED]:   'bg-red-950 text-red-400 border border-red-500/50',
      [TransactionStatus.DISPUTED]:    'bg-orange-950 text-orange-400 border border-orange-500/50',
    };
    return map[this.transaction().status] ?? 'bg-neutral-700 text-neutral-400';
  });

  borderClass = computed(() => {
    const map: Record<TransactionStatus, string> = {
      [TransactionStatus.PENDING]:     'border-amber-500/40 hover:border-amber-500',
      [TransactionStatus.CONFIRMED]:   'border-blue-500/40 hover:border-blue-500',
      [TransactionStatus.IN_PROGRESS]: 'border-primary/50 hover:border-primary',
      [TransactionStatus.COMPLETED]:   'border-green-500/40 hover:border-green-500',
      [TransactionStatus.CANCELLED]:   'border-neutral-600/40',
      [TransactionStatus.DISPUTED]:    'border-orange-500/40 hover:border-orange-500',
    };
    return map[this.transaction().status] ?? 'border-primary/50';
  });

  alreadySigned = computed(() => {
    const sig = this.transaction().contractSignatureStatus;
    if (!sig) return false;
    return this.isOfferor() ? sig.offerorSigned : sig.acceptorSigned;
  });

  canCancel = computed(() =>
    this.transaction().status !== TransactionStatus.COMPLETED &&
    this.transaction().status !== TransactionStatus.CANCELLED
  );

  canAccept = computed(() =>
    this.transaction().status === TransactionStatus.PENDING && !this.isOfferor()
  );

  canSign = computed(() =>
    !!this.transaction().contractId &&
    (this.transaction().status === TransactionStatus.CONFIRMED ||
     this.transaction().status === TransactionStatus.IN_PROGRESS) &&
    !this.alreadySigned()
  );

  canViewContract = computed(() =>
    !!this.transaction().contractId &&
    (this.transaction().status === TransactionStatus.CONFIRMED ||
     this.transaction().status === TransactionStatus.IN_PROGRESS ||
     this.transaction().status === TransactionStatus.COMPLETED)
  );
}