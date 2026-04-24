import { Component, inject, signal, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
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

  private router = inject(Router);

  offers        = signal<BarterOfferResponse[]>([]);
  loading       = signal(false);
  currentUserId = signal<string>('');

  selectedOffer = signal<BarterOfferResponse | null>(null);

  icons = ICONS_BARTER;

  ngOnInit(): void {
    this.currentUserId.set(this.authService.getUser()?.id ?? '');
    this.loadOffers();
  }

  loadOffers(): void {
    this.loading.set(true);
    this.offerService.listActive().subscribe({
      next: page => {
        this.offers.set(page.content ?? []);
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
