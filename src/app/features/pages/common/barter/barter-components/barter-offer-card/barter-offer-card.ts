import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { BarterOfferItemResponse } from '@core/types/barter/barter-offer-item.response';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';
import { OfferStatus } from '@core/enums/offer-status';
import { OfferType } from '@core/enums/offer-type';
import { UnitOfMeasure, UnitOfMeasureKey } from '@core/enums/unit-of-measure';

@Component({
  selector: 'app-barter-offer-card',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule, 
    CurrencyPipe, 
    DatePipe,
    ButtonPages
  ],
  templateUrl: './barter-offer-card.html'
})
export class BarterOfferCard {

  offer        = input.required<BarterOfferResponse>();
  currentUserId = input.required<string>();
  pendingTransaction = input<BarterTransactionResponse | null>(null);
  viewProposal       = output<string>();

  showActions = input<boolean>(true);
  propose    = output<BarterOfferResponse>();
  toCancel     = output<string>();
  edit        = output<BarterOfferResponse>();
  modalOpen   = signal<boolean>(false);

  showEditButton = input<boolean>();

  readonly icons = ICONS_BARTER;
  readonly status = OfferStatus;
  readonly type = OfferType;
  offerStatus = signal<OfferStatus>(OfferStatus.ACTIVE);
  OfferType = signal<OfferType>(OfferType.CROP);

  isOwner = computed(() => this.offer().ownerId === this.currentUserId());

  offerDelta = computed(() => {
    const suggested = this.offer().suggestedQuantity;
    const offered   = this.offer().offeredCropQuantity;
    if (!suggested || !offered) return null;
    const diff = offered - suggested;
    if (Math.abs(diff) < 0.1) return null;
    return {
      value: Math.abs(diff).toFixed(1),
      direction: diff > 0 ? 'acima' : 'abaixo'
    };
  });

  statusLabel = computed(() => {
    const map: Record<string, string> = {
      ACTIVE:    'Ativa',
      ACCEPTED:  'Aceita',
      COMPLETED: 'Concluída',
      EXPIRED:   'Expirada',
      CANCELLED: 'Cancelada',
    };
    return map[this.offer().status] ?? this.offer().status;
  });

  statusBadgeClass = computed(() => {
    const map: Record<string, string> = {
      ACTIVE:    'bg-primary/10 text-primary border border-primary/30',
      ACCEPTED:  'bg-blue-950 text-blue-400 border border-blue-500/50',
      COMPLETED: 'bg-green-950 text-green-400 border border-green-500/50',
      EXPIRED:   'bg-neutral-700 text-neutral-400',
      CANCELLED: 'bg-red-950 text-red-400 border border-red-500/50',
    };
    return map[this.offer().status] ?? 'bg-neutral-700 text-neutral-400';
  });

  offerTypeLabel = computed(() =>
    this.offer().offerType === 'CROP' ? 'Grão / Saca' : 'Ativo'
  );

  offerTypeBadgeClass = computed(() =>
    this.offer().offerType === 'CROP'
      ? 'bg-amber-950 text-amber-400 border border-amber-500/50'
      : 'bg-purple-950 text-purple-400 border border-purple-500/50'
  );

  totalRequestedValue = computed(() =>
    this.offer().requestedItems?.reduce((sum, i) => sum + i.totalPriceBrl, 0) ?? 0
  );

  priceVariance(item: BarterOfferItemResponse): 'up' | 'down' | 'equal' {
    if (item.currentAveragePriceBrl > item.unitPriceBrl) return 'up';
    if (item.currentAveragePriceBrl < item.unitPriceBrl) return 'down';
    return 'equal';
  }

  openEdit(): void {
    this.edit.emit(this.offer());
  }

  getUnitAbbreviation(unitKey: string | undefined): string {
    if (!unitKey) return '';
    
    const key = unitKey as UnitOfMeasureKey;
    return UnitOfMeasure[key]?.abbreviation || unitKey.toLowerCase();
  }
}

