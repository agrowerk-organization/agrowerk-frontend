import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ICONS_MARKET } from '@core/ui/icons/icons-producer/icons-market/icons-market';
import { Commodity } from '@core/types/market/commodity';
import { CommodityPriceResponse } from '@core/types/market/commodity-price.response';
@Component({
  selector: 'app-market-prices',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './market-prices.html'
})
export class MarketPrices {
  icons = ICONS_MARKET;

  latestPrices  = input.required<CommodityPriceResponse[]>();
  commodityMeta = input.required<Record<Commodity, { label: string; icon: IconDefinition; color: string }>>();

  metaFor(commodity: Commodity) { return this.commodityMeta()[commodity]; }

  isStale(referenceDate: string): boolean {
    return (Date.now() - new Date(referenceDate).getTime()) / 86_400_000 > 7;
  }

  variationIcon(v: number | null) {
    if (v === null || v === 0) return this.icons.MINUS;
    return v > 0 ? this.icons.ARROW_TREND_UP : this.icons.ARROW_TREND_DOWN;
  }

  variationClass(v: number | null): string {
    if (v === null || v === 0) return 'text-neutral-400';
    return v > 0 ? 'text-green-400' : 'text-red-400';
  }

  bgVariation(v: number | null): string {
    if (v === null || v === 0) return '';
    return v > 0 ? 'bg-green-500/10' : 'bg-red-500/10';
  }
}