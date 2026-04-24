import { Component, computed, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    ButtonPages, 
    DatePipe],
  templateUrl: './transaction-card.html'
})
export class TransactionCard {

  transaction   = input.required<BarterTransactionResponse>();
  currentUserId = input.required<string>();

  accept      = output<BarterTransactionResponse>();
  decline     = output<string>();
  toCancel      = output<string>();
  sign        = output<BarterTransactionResponse>();
  viewContract = output<string>();

  readonly icons = ICONS_BARTER;

  isOfferor = computed(() =>
    this.transaction().offerorId === this.currentUserId()
  );

  roleLabel = computed(() =>
    this.isOfferor() ? 'Ofertante' : 'Aceitante'
  );

  statusLabel = computed(() => {
    const map: Record<string, string> = {
      PENDING:     'Aguardando',
      CONFIRMED:   'Confirmada',
      IN_PROGRESS: 'Em andamento',
      COMPLETED:   'Concluída',
      CANCELLED:   'Cancelada',
    };
    return map[this.transaction().status] ?? this.transaction().status;
  });

  statusBadgeClass = computed(() => {
    const map: Record<string, string> = {
      PENDING:     'bg-amber-950 text-amber-400 border border-amber-500/50',
      CONFIRMED:   'bg-blue-950 text-blue-400 border border-blue-500/50',
      IN_PROGRESS: 'bg-primary/10 text-primary border border-primary/30',
      COMPLETED:   'bg-green-950 text-green-400 border border-green-500/50',
      CANCELLED:   'bg-red-950 text-red-400 border border-red-500/50',
    };
    return map[this.transaction().status] ?? 'bg-neutral-700 text-neutral-400';
  });

  borderClass = computed(() => {
    const map: Record<string, string> = {
      PENDING:     'border-amber-500/40 hover:border-amber-500',
      CONFIRMED:   'border-blue-500/40 hover:border-blue-500',
      IN_PROGRESS: 'border-primary/50 hover:border-primary',
      COMPLETED:   'border-green-500/40 hover:border-green-500',
      CANCELLED:   'border-neutral-600/40',
    };
    return map[this.transaction().status] ?? 'border-primary/50';
  });

  alreadySigned = computed(() => {
    const sig = this.transaction().contractSignatureStatus;
    if (!sig) return false;
    return this.isOfferor() ? sig.offerorSigned : sig.acceptorSigned;
  });
}