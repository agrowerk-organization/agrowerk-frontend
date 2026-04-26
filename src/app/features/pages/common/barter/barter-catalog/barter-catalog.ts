import { Component, computed, inject, signal, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map, startWith } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { BarterOfferResponse } from "@core/types/barter/barter-offer.response";
import { BarterOfferService } from "@core/services/barter-offer.service";
import { AuthService } from "@core/services/auth.service";
import { ToastService } from "@core/services/toast.service";
import { BarterOfferCard } from "../barter-components/barter-offer-card/barter-offer-card";
import { ProposeTransactionModal } from "../barter-components/propose-transaction-modal/propose-transaction-modal";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ICONS_BARTER } from "@core/ui/icons/icons-common/icons-barter/icons-barter";
import { OfferStatus } from "@core/enums/offer-status";
import { ButtonPages } from "@shared/components/buttons/button-pages/button-pages";
import { BackButton } from "@shared/components/back-button/back-button";
import { Title } from "@shared/components/title/title";
import { Subtitle } from "@shared/components/subtitle/subtitle";

@Component({
  selector: 'app-barter-catalog',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    BarterOfferCard,
    ProposeTransactionModal,
    ButtonPages,
    BackButton,
    Title,
    Subtitle
  ],
  templateUrl: './barter-catalog.html'
})
export class BarterCatalog implements OnInit {

  private offerService = inject(BarterOfferService);
  private authService  = inject(AuthService);
  private toastService = inject(ToastService);

  readonly router = inject(Router);

  offers        = signal<BarterOfferResponse[]>([]);
  loading       = signal(false);
  currentUserId = signal<string>('');

  selectedOffer = signal<BarterOfferResponse | null>(null);

  icons = ICONS_BARTER;

  currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)   
    ),
    { initialValue: this.router.url }
  );

  baseRoute = computed(() => this.currentUrl().startsWith('/supplier') ? 'supplier' : 'producer');

  isCatalog = computed(() =>
    (this.currentUrl().includes('/producer/barter') || this.router.url.includes('/supplier/barter')) 
    && !this.currentUrl().includes('my-offers') 
  );
  
  isProducer = computed(() => this.baseRoute() === 'producer');
  
  myAreaLabel = computed(() =>
    this.isProducer() ? 'Minhas Ofertas' : 'Minhas Transações'
  );
  
  myAreaRoute = computed(() =>
    this.isProducer() ? '/producer/my-offers' : '/supplier/my-transactions'
  );

  backLink = computed(() =>
    this.isProducer() ? '/producer/dashboard' : '/supplier/dashboard'
  );

  showActions = computed(() => {
    if (this.currentUrl().includes('my-offers')) return true;
    
    if (this.isProducer()) return !this.isCatalog(); 
    
    return true; 
  });
  
  ngOnInit(): void {
    this.currentUserId.set(this.authService.getUser()?.id ?? '');
    this.loadOffers();
  }

  loadOffers(): void {
    this.loading.set(true);
    const request$ = this.isProducer()
      ? this.offerService.listActive(0, 10)
      : this.offerService.listForSupplier(0, 10);
  
    request$.subscribe({
      next: res => {
        this.offers.set(res.content ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  openPropose(offer: BarterOfferResponse): void {
    this.selectedOffer.set(offer);
  }

  closeModal(): void {
    this.selectedOffer.set(null);
  }

  onProposed(): void {
    this.closeModal();
    this.toastService.success('Transação foi proposta com sucesso!');
  }

  cancelOffer(offerId: string): void {
    this.offerService.cancelOffer(offerId).subscribe({
      next: () => {
        this.toastService.success('Oferta cancelada com sucesso.');
        this.offers.update(list =>
          list.map(o => o.id === offerId ? { ...o, status: OfferStatus.CANCELLED } : o)
        );
      },
      error: () => this.toastService.error('Erro ao cancelar oferta.'),
    });
  }

  goToMyOffers() {
    this.router.navigate(['/producer/my-offers']);
  }
}
