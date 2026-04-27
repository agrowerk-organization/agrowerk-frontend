import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarterOfferCard } from '../barter-offer-card/barter-offer-card';
import { CreateOfferModal } from '../create-offer-modal/create-offer-modal';
import { EditOfferModal } from '../edit-offer-modal/edit-offer-modal';
import { BarterOfferService } from '@core/services/barter-offer.service';
import { ToastService } from '@core/services/toast.service';
import { AuthService } from '@core/services/auth.service';
import { BarterTransactionService } from '@core/services/barter-transaction.service';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { OfferStatus, OfferStatusDesc } from '@core/enums/offer-status';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { AcceptTransactionModal } from '../accept-transaction-modal/accept-transaction-modal';


type FilterValue = 'ALL' | OfferStatus;

@Component({
  selector: 'app-my-offers',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    BarterOfferCard,
    CreateOfferModal,
    EditOfferModal,
    AcceptTransactionModal,
    ButtonPages,
    Title,
    Subtitle,
    BackButton
  ],
  templateUrl: './my-offers.html'
})
export class MyOffers implements OnInit {

  private offerService = inject(BarterOfferService);
  private transactionService = inject(BarterTransactionService);
  private toast        = inject(ToastService);
  private authService  = inject(AuthService);

  offers        = signal<BarterOfferResponse[]>([]);
  transactions  = signal<BarterTransactionResponse[]>([]);
  loading       = signal(false);
  loadingMore   = signal(false);
  currentUserId = signal('');

  private currentPage = 0;
  private totalPages  = 1;
  isLastPage = computed(() => this.currentPage >= this.totalPages - 1);

  activeFilter = signal<FilterValue>('ALL');

  filtered = computed(() => {
    const f = this.activeFilter();
    if (f === 'ALL') return this.offers();
    return this.offers().filter(o => o.status === f);
  });

  showCreate           = signal(false);
  offerToEdit          = signal<BarterOfferResponse | null>(null);

  readonly icons = ICONS_BARTER;

  readonly statusFilters: { value: FilterValue; label: string }[] = [
    { value: 'ALL',                   label: 'Todas' },
    { value: OfferStatus.ACTIVE,      label: OfferStatusDesc[OfferStatus.ACTIVE] },
    { value: OfferStatus.ACCEPTED,    label: OfferStatusDesc[OfferStatus.ACCEPTED] },
    { value: OfferStatus.COMPLETED,   label: OfferStatusDesc[OfferStatus.COMPLETED] },
    { value: OfferStatus.EXPIRED,     label: OfferStatusDesc[OfferStatus.EXPIRED] },
    { value: OfferStatus.CANCELLED,   label: OfferStatusDesc[OfferStatus.CANCELLED] },
  ];

  pendingByOfferId = computed(() => {
    const map = new Map<string, BarterTransactionResponse>();
    this.transactions().forEach(t => {
      if (t.status === 'PENDING')
        map.set(t.offerId, t);
    });
    return map;
  });

  selectedTransaction = signal<BarterTransactionResponse | null>(null);

  ngOnInit(): void {
    this.currentUserId.set(this.authService.getUser()?.id ?? '');
    this.loadOffers();
    this.loadTransactions(); 
  }

  getOfferById(offerId: string): BarterOfferResponse | undefined {
    return this.offers().find(o => o.id === offerId);
  }

  private loadTransactions(): void {
    this.transactionService.listMine(0, 50).subscribe({
      next: page => this.transactions.set(page.content ?? []),
      error: () => void this.toast.error('Erro ao carregar transações.')
    });
  }

  onViewProposal(offerId: string): void {
    const tx = this.pendingByOfferId().get(offerId);
    if (tx) this.selectedTransaction.set(tx);
  }

  onAccepted(): void {
    this.selectedTransaction.set(null);
    this.toast.success('Proposta aceita!');
    this.loadOffers();
  }

  onDeclined(): void {
    this.selectedTransaction.set(null);
    this.loadTransactions();
  }

  setFilter(value: FilterValue): void {
    this.activeFilter.set(value);
  }

  loadMore(): void {
    if (this.isLastPage() || this.loadingMore()) return;
    this.currentPage++;
    this.loadingMore.set(true);
    this.offerService.listMyOffers(this.currentPage).subscribe({
      next: page => {
        this.offers.update(list => [...list, ...page.content ?? []]);
        this.totalPages = page.totalPages;
        this.loadingMore.set(false);
      },
      error: () => {
        this.loadingMore.set(false);
        this.toast.error('Erro ao carregar mais ofertas.');
      }
    });
  }

  onCancel(offerId: string): void {
    this.offerService.cancelOffer(offerId).subscribe({
      next: () => {
        this.toast.success('Oferta cancelada.');
        this.offers.update(list =>
          list.map(o => o.id === offerId ? { ...o, status: 'CANCELLED' as OfferStatus } : o)
        );
      },
      error: () => this.toast.error('Erro ao cancelar oferta.'),
    });
  }

  onEdit(offer: BarterOfferResponse): void {
    this.offerToEdit.set(offer);
  }

  onCreated(offer: BarterOfferResponse): void {
    this.showCreate.set(false);
    this.toast.success('Oferta criada com sucesso!');
    this.offers.update(list => [offer, ...list]);
    this.loadOffers();
  }

  onUpdated(offer: BarterOfferResponse): void {
    this.offerToEdit.set(null);
    this.toast.success('Oferta atualizada.');
    this.offers.update(list =>
      list.map(o => o.id === offer.id ? offer : o)
    );
  }

  closeModals(): void {
    this.showCreate.set(false);
    this.offerToEdit.set(null);
  }

  private loadOffers(reset = false): void {
    if (reset) {
      this.currentPage = 0;
      this.offers.set([]);
    }
    this.loading.set(true);
    this.offerService.listMyOffers(0).subscribe({
      next: page => {
        this.offers.set(page.content ?? []);
        this.totalPages = page.totalPages;
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Erro ao carregar ofertas.');
      }
    }); 
  } 
}