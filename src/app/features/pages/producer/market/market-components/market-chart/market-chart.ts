import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts/types/dist/shared';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ICONS_MARKET } from '@core/ui/icons/icons-producer/icons-market/icons-market';
import { Commodity } from '@core/enums/commodity';

@Component({
  selector: 'app-market-chart',
  standalone: true,
  imports: [FontAwesomeModule, NgxEchartsDirective],
  templateUrl: './market-chart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketChart {
  icons = ICONS_MARKET;

  chartOption       = input.required<EChartsOption>();
  commodities       = input.required<Commodity[]>();
  periodOptions     = input.required<{ label: string; value: number }[]>();
  selectedCommodity = input.required<Commodity>();
  selectedDays      = input.required<number>();
  commodityMeta     = input.required<Record<Commodity, { label: string; icon: IconDefinition; color: string }>>();

  commodityChange = output<Commodity>();
  daysChange      = output<number>();

  metaFor(commodity: Commodity) { return this.commodityMeta()[commodity]; }
}