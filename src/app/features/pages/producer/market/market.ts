import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICONS_MARKET } from '@core/ui/icons/icons-producer/icons-market/icons-market';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts/types/dist/shared';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { Commodity } from '@core/types/market/commodity';
import { CommodityDashboardResponse } from '@core/types/market/commodity-dashboard.response';
import { CommodityPriceService } from '@core/services/commodity-price.service';
@Component({
  selector: 'app-market',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    NgxEchartsDirective
  ],
  templateUrl: './market.html'
})
export class Market implements OnInit {
  private readonly commodityPriceService = inject(CommodityPriceService);

  icons = ICONS_MARKET;

  readonly COMMODITY_META: Record<Commodity, { label: string; icon: IconDefinition; color: string }> = {
    SOJA:     { label: 'Soja',     icon: this.icons.SEEDLING,  color: 'text-yellow-400' },
    MILHO:    { label: 'Milho',    icon: this.icons.SEEDLING,  color: 'text-yellow-300' },
    CAFE:     { label: 'Café',     icon: this.icons.MUG_HOT,    color: 'text-amber-600'  },
    TRIGO:    { label: 'Trigo',    icon: this.icons.WHEAT_AWN,  color: 'text-yellow-500' },
    ALGODAO:  { label: 'Algodão',  icon: this.icons.BOXES,     color: 'text-neutral-300'},
    ACUCAR:   { label: 'Açúcar',   icon: this.icons.CUBE, color: 'text-primary' }
  };
  
  readonly PERIOD_OPTIONS = [
    { label: '1 ano',    value: 365 },
    { label: '3 anos',   value: 1095 },
    { label: '5 anos',   value: 1825 },
  ];

  loading       = signal(true);
  dashboard     = signal<CommodityDashboardResponse | null>(null);
  selectedDays  = signal<number>(365);
  selectedCommodity = signal<Commodity>('SOJA');

  periodOptions = this.PERIOD_OPTIONS;
  commodities   = Object.keys(this.COMMODITY_META) as Commodity[];

  chartOption = computed<EChartsOption>(() => {
    const dash = this.dashboard();
    const commodity = this.selectedCommodity();
    const days = this.selectedDays();
    if (!dash) return {};

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const history = (dash.history[commodity] ?? [])
      .filter(p => new Date(p.referenceDate) >= cutoff)
      .sort((a, b) => a.referenceDate.localeCompare(b.referenceDate));

    const dates  = history.map(p => p.referenceDate);
    const prices = history.map(p => p.price);

    type AxisFormatterParams = CallbackDataParams & {
      axisValue: string | number;
    };

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        confine: true,
        backgroundColor: '#171717', 
        borderColor: '#404040',     
        borderWidth: 1,
        padding: [8, 12],           
        textStyle: {
          color: '#22c55e',         
          fontSize: 14,
          fontFamily: 'sans-serif'
        },
        extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); border-radius: 8px;',
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const p = (Array.isArray(params) ? params[0] : params) as AxisFormatterParams;
          return `
            <div style="font-weight: 600; margin-bottom: 4px;">${p.axisValue}</div>
            <div style="color: #ffffff; font-size: 12px;">
              Preço: <span style="color: #22c55e; font-weight: bold;">R$ ${(p.value as number).toFixed(2)}</span>
            </div>
          `;
        }
      },
      grid: { 
        left: '2%', 
        right: '4%', 
        bottom: '5%', 
        top: '12%', 
        containLabel: true 
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: false, 
        axisLabel: {
          color: '#FF9800',
          fontSize: 16,
          fontWeight: 800,
          fontFamily: 'Inter, sans-serif',
          margin: 15,
          formatter: (val: string) => {
            const d = new Date(val);
            const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            return `${monthNames[d.getMonth()]}/${d.getFullYear().toString().slice(2)}`;
          }
        },
        axisLine: { show: false }, 
        axisTick: { show: false }, 
      },
      yAxis: {
        type: 'value',
        min: 'dataMin', 
        axisLabel: {
          color: '#4CAF50', 
          fontSize: 16,
          fontWeight: 800,
          fontFamily: 'Inter, sans-serif',
          margin: 15,
          formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}`
        },
        splitLine: { 
          lineStyle: { 
            color: 'rgba(0, 148, 37, 0.4)', 
            type: 'dashed',
            width: 1
          } 
        },
      },
      series: [{
        type: 'line',
        data: prices,
        smooth: 0.4, 
        symbol: 'circle',
        symbolSize: 8,
        showSymbol: false, 
        lineStyle: { 
          width: 3, 
          color: '#22c55e',
          shadowBlur: 10,
          shadowColor: 'rgba(34, 197, 94, 0.5)' 
        },
        itemStyle: { color: '#22c55e' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(34,197,94,0.25)' },
              { offset: 1, color: 'rgba(34,197,94,0)' },
            ]
          }
        }
      }]
    };
  });

  ngOnInit() {
    this.commodityPriceService.getDashboard().subscribe({
      next: data => {
        this.dashboard.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  metaFor(commodity: Commodity) {
    return this.COMMODITY_META[commodity];
  }

  isStale(referenceDate: string): boolean {
    const diff = (Date.now() - new Date(referenceDate).getTime()) / 86_400_000;
    return diff > 7;
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
    return v > 0 ? 'bg-green-500/5' : 'bg-red-500/5';
  }

}
