import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionCard } from '../barter-components/transaction-card/transaction-card';
import { AcceptTransactionModal } from '../barter-components/accept-transaction-modal/accept-transaction-modal';
import { SignContractModal } from '../barter-components/sign-contract-modal/sign-contract-modal';
import { BarterTransactionService } from '@core/services/barter-transaction.service';
import { ToastService } from '@core/services/toast.service';
import { AuthService } from '@core/services/auth.service';
import { BarterOfferService } from '@core/services/barter-offer.service';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { BarterContractResponse } from '@core/types/barter/barter-contract.response';
import { TransactionStatus } from '@core/enums/transaction-status';
import { TransactionStatusDesc } from '@core/enums/transaction-status';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { BackButton } from '@shared/components/back-button/back-button';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';

type FilterValue = 'ALL' | TransactionStatus;

@Component({
  selector: 'app-my-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    TransactionCard,
    AcceptTransactionModal,
    SignContractModal,
    BackButton,
    Title,
    Subtitle
  ],
  templateUrl: './my-transactions.html'
})
export class MyTransactions implements OnInit {

  private barterTransactionService   = inject(BarterTransactionService);
  private barterOfferService = inject(BarterOfferService);
  private toast       = inject(ToastService);
  private authService = inject(AuthService);

  transactions  = signal<BarterTransactionResponse[]>([]);
  transactionsToAccept = signal<BarterTransactionResponse | null>(null);
  offerToAccept = signal<BarterOfferResponse | null>(null);
  loading       = signal(false);
  loadingMore   = signal(false);
  currentUserId = signal('');

  private currentPage = 0;
  private totalPages  = 1;
  isLastPage = computed(() => this.currentPage >= this.totalPages - 1);

  activeFilter = signal<FilterValue>('ALL');

  filtered = computed(() => {
    const f = this.activeFilter();
    if (f === 'ALL') return this.transactions();
    return this.transactions().filter(t => t.status === f);
  });

  transactionToAccept = signal<BarterTransactionResponse | null>(null);
  contractToSign      = signal<BarterContractResponse | null>(null);

  totalInputsBrl = computed(() => {
    const tx = this.transactionToAccept();
    if (!tx) return 0;
    return 0;
  });

  readonly icons = ICONS_BARTER;

  readonly statusFilters: { value: FilterValue; label: string }[] = [
    { value: 'ALL',                        label: 'Todas' },
    { value: TransactionStatus.PENDING,     label: TransactionStatusDesc[TransactionStatus.PENDING] },
    { value: TransactionStatus.CONFIRMED,   label: TransactionStatusDesc[TransactionStatus.CONFIRMED] },
    { value: TransactionStatus.IN_PROGRESS, label: TransactionStatusDesc[TransactionStatus.IN_PROGRESS] },
    { value: TransactionStatus.COMPLETED,   label: TransactionStatusDesc[TransactionStatus.COMPLETED] },
    { value: TransactionStatus.CANCELLED,   label: TransactionStatusDesc[TransactionStatus.CANCELLED] },
  ];

  ngOnInit(): void {
    this.currentUserId.set(this.authService.getUser()?.id ?? '');
    this.loadTransactions();
  }

  setFilter(value: FilterValue): void {
    this.activeFilter.set(value);
  }

  loadMore(): void {
    if (this.isLastPage() || this.loadingMore()) return;
    this.currentPage++;
    this.loadingMore.set(true);
    this.barterTransactionService.listMine(this.currentPage).subscribe({
      next: page => {
        this.transactions.update(list => [...list, ...page.content ?? []]);
        this.totalPages = page.totalPages;
        this.loadingMore.set(false);
      },
      error: () => {
        this.loadingMore.set(false);
        this.toast.error('Erro ao carregar mais transações.');
      }
    });
  }

  openAccept(tx: BarterTransactionResponse): void {
    this.barterOfferService.findById(tx.offerId).subscribe({
      next: offer => {
        this.transactionToAccept.set(tx);
        this.offerToAccept.set(offer);
      },
      error: () => this.toast.error('Erro ao carregar detalhes da oferta.'),
    });
  }

  onDecline(transactionId: string): void {
    this.barterTransactionService.decline(transactionId).subscribe({
      next: () => {
        this.toast.success('Proposta recusada.');
        this.updateStatus(transactionId, TransactionStatus.CANCELLED);
      },
      error: () => this.toast.error('Erro ao recusar proposta.'),
    });
  }

  onCancel(transactionId: string): void {
    this.barterTransactionService.cancel(transactionId).subscribe({
      next: () => {
        this.toast.success('Transação cancelada.');
        this.updateStatus(transactionId, TransactionStatus.CANCELLED);
      },
      error: () => this.toast.error('Erro ao cancelar transação.'),
    });
  }

  openSign(tx: BarterTransactionResponse): void {
    if (!tx.contractId) return;
    this.barterTransactionService.findContract(tx.id).subscribe({
      next: contract => this.contractToSign.set(contract),
      error: () => this.toast.error('Erro ao carregar contrato.'),
    });
  }

  onViewContract(transactionId: string): void {
    this.barterTransactionService.findContract(transactionId).subscribe({
      next: contract => this.contractToSign.set(contract),
      error: () => this.toast.error('Erro ao carregar contrato.'),
    });
  }

  onAccepted(updated: BarterTransactionResponse): void {
    this.closeModals();
    this.toast.success('Proposta aceita! Contrato gerado e enviado por e-mail.');
    this.replaceTransaction(updated);

    if (updated.contractId) this.openSign(updated);
  }

  onDeclined(): void {
    this.closeModals();
    this.toast.success('Proposta recusada.');
    this.loadTransactions(true);
  }

  onSigned(): void {
    this.closeModals();
    this.toast.success('Contrato assinado com sucesso!');
    this.loadTransactions(true);
  }

  closeModals(): void {
    this.transactionToAccept.set(null);
    this.offerToAccept.set(null);
    this.contractToSign.set(null);
  }

  private loadTransactions(reset = false): void {
    if (reset) {
      this.currentPage = 0;
      this.transactions.set([]);
    }
    this.loading.set(true);
    this.barterTransactionService.listMine(0).subscribe({
      next: page => {
        this.transactions.set(page.content ?? []);
        this.totalPages = page.totalPages;
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Erro ao carregar transações.');
      }
    });
  }

  private updateStatus(id: string, status: TransactionStatus): void {
    this.transactions.update(list =>
      list.map(t => t.id === id ? { ...t, status } : t)
    );
  }

  private replaceTransaction(updated: BarterTransactionResponse): void {
    this.transactions.update(list =>
      list.map(t => t.id === updated.id ? updated : t)
    );
  }
}