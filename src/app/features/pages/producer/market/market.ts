import { CommonModule } from '@angular/common';
import {
  Component, computed, inject, signal, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { ICONS_MARKET } from '@core/ui/icons/icons-producer/icons-market/icons-market';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { EChartsOption } from 'echarts/types/dist/shared';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { Commodity } from '@core/enums/commodity';
import { CommodityDashboardResponse } from '@core/types/market/commodity-dashboard.response';
import { ReportType } from '@core/types/market/report-type';
import { MarketAlert } from '@core/types/market/market-alert';
import { MarketReport } from '@core/types/market/market-report';
import { CommodityPriceService } from '@core/services/commodity-price.service';
import { MarketAlertService } from '@core/services/market-alert.service';
import { MarketReportService } from '@core/services/market-report.service';
import { forkJoin } from 'rxjs';
import { MarketLoading } from './market-components/market-loading/market-loading';
import { MarketAlerts } from './market-components/market-alerts/market-alerts';
import { MarketReports } from './market-components/market-reports/market-reports';
import { MarketPrices } from './market-components/market-prices/market-prices';
import { MarketChart } from './market-components/market-chart/market-chart';
import { BackButton } from "@shared/components/back-button/back-button";

@Component({
  selector: 'app-market',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FontAwesomeModule,
    MarketLoading,
    MarketAlerts,
    MarketReports,
    MarketPrices,
    MarketChart,
    BackButton
],
  templateUrl: './market.html'
})
export class Market implements OnInit {
  private readonly commodityPriceService = inject(CommodityPriceService);
  private readonly marketAlertService    = inject(MarketAlertService);
  private readonly marketReportService   = inject(MarketReportService);

  icons = ICONS_MARKET;

  readonly COMMODITY_META: Record<Commodity, { label: string; icon: IconDefinition; color: string }> = {
    SOJA:    { label: 'Soja',    icon: this.icons.SEEDLING,  color: 'text-yellow-400' },
    MILHO:   { label: 'Milho',   icon: this.icons.SEEDLING,  color: 'text-yellow-300' },
    CAFE:    { label: 'Café',    icon: this.icons.MUG_HOT,   color: 'text-orange-700'  },
    TRIGO:   { label: 'Trigo',   icon: this.icons.WHEAT_AWN, color: 'text-yellow-500' },
    ALGODAO: { label: 'Algodão', icon: this.icons.BOXES,     color: 'text-blue-300'   },
    ACUCAR:  { label: 'Açúcar',  icon: this.icons.CUBE,      color: 'text-white'      },
    BOI_GORDO: { label: 'Boi Gordo', icon: this.icons.DRUMSTICK_BITE, color: 'text-orange-700' }
  };

  readonly PERIOD_OPTIONS = [
    { label: '1 ano',  value: 365  },
    { label: '3 anos', value: 1095 },
    { label: '5 anos', value: 1825 },
  ];

  commodities   = Object.keys(this.COMMODITY_META) as Commodity[];
  periodOptions = this.PERIOD_OPTIONS;

  loading           = signal(true);
  dashboard         = signal<CommodityDashboardResponse | null>(null);
  alerts            = signal<MarketAlert[]>([]);
  report            = signal<MarketReport | null>(null);
  selectedDays      = signal<number>(365);
  selectedCommodity = signal<Commodity>('SOJA');
  alertsExpanded    = signal(false);
  selectedReportType = signal<ReportType>('ANNUAL_TREND');

  unreadCount = computed(() => this.alerts().filter(a => !a.read).length);

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

    type AxisFormatterParams = CallbackDataParams & { axisValue: string | number };

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        confine: true,
        backgroundColor: '#171717',
        borderColor: '#22c55e',
        borderWidth: 2,
        padding: [10, 16],
        textStyle: { color: '#22c55e', fontSize: 18, fontFamily: 'sans-serif' },
        extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.5); border-radius: 8px;',
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const p = (Array.isArray(params) ? params[0] : params) as AxisFormatterParams;
          return `
            <div style="font-weight:600;margin-bottom:4px;">${p.axisValue}</div>
            <div style="color:#ffffff;font-size:16px;">
              Preço: <span style="color:#22c55e;font-weight:bold;">R$ ${(p.value as number).toFixed(2)}</span>
            </div>`;
        }
      },
      grid: { left: '2%', right: '4%', bottom: '5%', top: '12%', containLabel: true },
      xAxis: {
        type: 'category', data: dates, boundaryGap: false,
        axisLabel: {
          color: '#FF9800', fontSize: 16, fontWeight: 800, fontFamily: 'Inter, sans-serif', margin: 15,
          formatter: (val: string) => {
            const d = new Date(val);
            const m = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
            return `${m[d.getMonth()]}/${d.getFullYear().toString().slice(2)}`;
          }
        },
        axisLine: { show: false }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value', min: 'dataMin',
        axisLabel: {
          color: '#4CAF50', fontSize: 16, fontWeight: 800,
          fontFamily: 'Inter, sans-serif', margin: 15,
          formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}`
        },
        splitLine: { lineStyle: { color: 'rgba(0,148,37,0.4)', type: 'dashed', width: 1 } }
      },
      series: [{
        type: 'line', data: prices, smooth: 0.4,
        symbol: 'circle', symbolSize: 8, showSymbol: false,
        lineStyle: { width: 3, color: '#22c55e', shadowBlur: 10, shadowColor: 'rgba(34,197,94,0.5)' },
        itemStyle: { color: '#22c55e' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(34,197,94,0.25)' },
              { offset: 1, color: 'rgba(34,197,94,0)'    },
            ]
          }
        }
      }]
    };
  });

  ngOnInit() {
    forkJoin({
      dashboard: this.commodityPriceService.getDashboard(),
      alerts:    this.marketAlertService.getUnread(),
    }).subscribe({
      next: ({ dashboard, alerts }) => {
        this.dashboard.set(dashboard);
        this.alerts.set(alerts);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });

    this.loadReport(this.selectedReportType());
  }

  periodAnalytics = computed(() => {
    const dash = this.dashboard();
    const commodity = this.selectedCommodity();
    const days = this.selectedDays();
    if (!dash || !dash.history[commodity]) return null;
  
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
  
    const history = dash.history[commodity]
      .filter(p => new Date(p.referenceDate) >= cutoff)
      .sort((a, b) => a.price - b.price);
  
    if (history.length === 0) return null;
  
    const min = history[0];
    const max = history[history.length - 1];
  
    const avgPrice = history.reduce((sum, p) => sum + p.price, 0) / history.length;
  
    return {
      minPrice: min.price,
      minDate: min.referenceDate,
      maxPrice: max.price,
      maxDate: max.referenceDate,
      avgPrice: avgPrice,
      avgExchange: dash.avgExchangeRate,
      recordCount: history.length
    };
  });

  loadReport(type: ReportType) {
    this.report.set(null);
    this.marketReportService.getLatestByType(type).subscribe({
      next:  r  => this.report.set(r),
      error: () => this.report.set(null)
    });
  }

  selectReportType(type: ReportType) {
    this.selectedReportType.set(type);
    this.loadReport(type);
  }

  markAlertRead(id: string) {
    this.marketAlertService.markAsRead(id).subscribe(() => {
      this.alerts.update(list =>
        list.map(a => a.id === id ? { ...a, read: true } : a)
      );
    });
  }

  markAllRead() {
    this.marketAlertService.markAllAsRead().subscribe(() => {
      this.alerts.update(list => list.map(a => ({ ...a, read: true })));
    });
  }

  generateReport() {
    this.marketReportService.generate(this.selectedReportType()).subscribe({
      next: r => this.report.set(r)
    });
  }
}