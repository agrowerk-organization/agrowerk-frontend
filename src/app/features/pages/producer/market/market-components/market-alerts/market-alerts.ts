import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_MARKET } from '@core/ui/icons/icons-producer/icons-market/icons-market';
import { MarketAlert } from '@core/types/market/market-alert';
import { AlertSeverity } from '@core/types/market/alert-severity';

@Component({
  selector: 'app-market-alerts',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './market-alerts.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketAlerts {
  icons = ICONS_MARKET;
  
  readonly SEVERITY_CONFIG: Record<AlertSeverity, { border: string; badge: string; label: string }> = {
    WARNING:     { border: 'border-yellow-500/60', badge: 'bg-yellow-500/10 text-yellow-400', label: 'Atenção'      },
    OPPORTUNITY: { border: 'border-green-500/60',  badge: 'bg-green-500/10  text-green-400',  label: 'Oportunidade' },
    INFO:        { border: 'border-blue-500/60',   badge: 'bg-blue-500/10   text-blue-400',   label: 'Info'         },
  };

  alerts       = input.required<MarketAlert[]>();
  unreadCount  = input.required<number>();
  expanded     = input<boolean>();

  markAllRead    = output<void>();
  markAlertRead  = output<string>();
  toggleExpanded = output<void>();

  severityConfig(severity: AlertSeverity) {
    return this.SEVERITY_CONFIG[severity];
  }
}