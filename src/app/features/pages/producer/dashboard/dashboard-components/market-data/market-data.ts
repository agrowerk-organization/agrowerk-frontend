import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, input, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommodityDashboardResponse } from '@core/types/market/commodity-dashboard.response';
import { ICONS_DASHBOARD } from '@core/ui/icons/icons-producer/icons-dashboard/icons-dashboard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-market-data',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    DecimalPipe
  ],
  templateUrl: './market-data.html'
})
export class MarketData {
  dashboard = input<CommodityDashboardResponse | null>(null);

  icons = ICONS_DASHBOARD;

  readonly commodityMeta : Record<string, { icon: IconDefinition; color: string}> = {
    SOJA: { icon: this.icons.SEEDLING, color: 'text-green-400' },
    MILHO: { icon: this.icons.WHEAT_AWN, color: 'text-yellow-400' },
    BOI_GORDO: { icon: this.icons.DRUMSTICK_BITE, color: 'text-gray-400' },
    CAFE: { icon: this.icons.MUG_HOT, color: 'text-brown-400' },
    TRIGO: { icon: this.icons.WHEAT_AWN, color: 'text-yellow-200' },
    ALGODAO: { icon: this.icons.LEAF, color: 'text-blue-300' }
  };

  prices = computed(() => this.dashboard()?.latestPrices ?? []);

  variationClass(v: number | null): string {
    if (v == null) return 'text-neutral-secondary';
    return v > 0 ? 'text-green-400' : v < 0 ? 'text-red-400' : 'text-neutral-secondary';
  }

  variationIcon(v: number | null) {
    if (v == null) return this.icons.NEUTER;
    return v > 0 ? this.icons.ARROW_TREND_UP : v < 0 ? this.icons.ARROW_TREND_DOWN : this.icons.NEUTER;
  }

  bgVariation(v: number | null): string {
    if (v == null) return 'bg-neutral-primary';
    return v > 0 ? 'bg-green-500/10' : v < 0 ? 'bg-red-500/10' : 'bg-neutral-primary';
  }

  metaFor(commodity: string) {
    return this.commodityMeta[commodity] ?? { icon: this.icons.CHART_LINE, color: 'text-primary' };
  }

}
