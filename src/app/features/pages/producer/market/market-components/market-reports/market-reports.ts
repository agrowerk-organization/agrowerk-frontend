import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_MARKET } from '@core/ui/icons/icons-producer/icons-market/icons-market';
import { MarketReport } from '@core/types/market/market-report';
import { ReportType } from '@core/types/market/report-type';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@shared/components/badge/badge';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
@Component({
  selector: 'app-market-report',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    Badge,
    ButtonPages],
  templateUrl: './market-reports.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketReports {
  readonly icons = ICONS_MARKET;

  report             = input.required<MarketReport | null>();
  selectedReportType = input.required<ReportType>();

  generateReport = output<void>();
  selectReportType = output<ReportType>();

  readonly REPORT_LABELS: Record<ReportType, string> = {
    MONTHLY_TREND:     'Tendência Mensal',
    ANNUAL_TREND:      'Tendência Anual',
    VOLATILITY_ALERT:  'Alerta de Volatilidade'
  };

  readonly COMMODITY_LABELS: Record<string, string> = {
    SOJA:      'Soja',
    MILHO:     'Milho',
    BOI_GORDO: 'Boi Gordo',
    CAFE:      'Café',
    ALGODAO:   'Algodão',
    TRIGO:     'Trigo',
    ACUCAR:    'Açúcar'
  };

  readonly TREND_LABELS: Record<string, string> = {
    UPTREND: 'Tendência de Alta',
    DOWNTREND: 'Tendência de Baixa',
    SIDEWAYS: ' Estável',
    VOLATILE: 'Alta Volatilidade'
  };

  normalizeName(key: string | unknown): string {
    const k = String(key).toUpperCase();
    
    if (this.COMMODITY_LABELS[k]) {
      return this.COMMODITY_LABELS[k];
    }
  
    return k.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
  }

  normalizeHighlight(text: string): string {
    if (!text) return '';
  
    const parts = text.split(':');
    if (parts.length < 2) return text;
  
    const enumKey = parts[0].trim().toUpperCase();
    let remaining = parts.slice(1).join(':').trim();
  
    const label = this.COMMODITY_LABELS[enumKey] || this.normalizeName(enumKey);
  
    Object.keys(this.TREND_LABELS).forEach(key => {
      if (remaining.toUpperCase().includes(key)) {
        const regex = new RegExp(key, 'gi');
        remaining = remaining.replace(regex, this.TREND_LABELS[key]);
      }
    });
  
    remaining = remaining.replace(/avg/gi, 'média');
  
    return `${label}: ${remaining}`;
  }

  get marketBadges() {
    const highlights = this.report()?.reportPayload?.highlights;
    if (!highlights) return [];

    return highlights.map(h => ({
      text: this.normalizeHighlight(h),
      icon: this.metaFor(h.split(':')[0].trim()).icon
    }));
  }

  metaFor(key: string | unknown) {
    const commodity = String(key).toUpperCase();
    
    const config: Record<string, { icon: IconDefinition, color: string }> = {
      SOJA:      { icon: this.icons.SEEDLING,    color: 'text-green-500' },
      MILHO:     { icon: this.icons.WHEAT_AWN,   color: 'text-yellow-500' },
      BOI_GORDO: { icon: this.icons.COW,         color: 'text-red-500' },
      CAFE:      { icon: this.icons.MUG_HOT,     color: 'text-orange-900' },
      ALGODAO:   { icon: this.icons.COTTON_BUREAU, color: 'text-blue-200' },
      TRIGO:     { icon: this.icons.WHEAT_WHEAT, color: 'text-yellow-600' },
      ACUCAR:    { icon: this.icons.CUBES,       color: 'text-neutral-100' }
    };

    return config[commodity] || { icon: this.icons.CHART_LINE, color: 'text-primary' };
  }

  getVal(map: Record<string, number> | undefined, key: string | unknown): number {
    const k = String(key);
    return (map && k in map) ? map[key as string] : 0;
  }
}