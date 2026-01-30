import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimelinePhase } from '../../../../../core/ui/types/timeline-phase/timeline-phase';
import { ICONS_DIGITAL_HARVEST } from '../../../../../core/ui/icons/icons.digital-harvest';
import { PhaseConnector } from './digital-harvest-components/phase-connector/phase-connector';
import { PhaseDetails } from './digital-harvest-components/phase-details/phase-details';
import { PhaseCard } from './digital-harvest-components/phase-card/phase-card';


@Component({
  selector: 'app-digital-harvest',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, PhaseConnector, PhaseDetails, PhaseCard],
  templateUrl: './digital-harvest.html',
  styleUrls: ['./digital-harvest.css']
})
export class DigitalHarvestTimelineComponent implements OnInit {
  // Icons
  icons = ICONS_DIGITAL_HARVEST;

  activePhase = signal(0);

  phases: TimelinePhase[] = [
    {
      id: 'safra',
      title: 'Gestão de Safras',
      subtitle: 'Planeje e monitore sua produção',
      icon: this.icons.SEEDLING,
      color: 'primary',
      bgGradient: 'bg-gradient-to-br from-primary/90 to-primary/10',
      features: [
        'Cronograma de plantio e colheita',
        'Previsão climática em tempo real',
        'Alertas inteligentes por fase',
        'Rastreamento por lote (batch)'
      ],
      stats: [
        { label: 'Hectares', value: '15.000+', icon: this.icons.CHART_LINE },
        { label: 'Safras ativas', value: '320', icon: this.icons.CALENDAR_ALT },
        { label: 'Produtividade', value: '+40%', icon: this.icons.SEEDLING }
      ]
    },
    {
      id: 'inventario',
      title: 'Inventário Inteligente',
      subtitle: 'Controle total do seu estoque',
      icon: this.icons.WAREHOUSE,
      color: 'secondary',
      bgGradient: 'bg-gradient-to-br from-primary/90 to-primary/10',
      features: [
        'Monitoramento em tempo real',
        'Alertas de estoque mínimo',
        'Histórico completo de movimentações',
        'Gestão multi-propriedade'
      ],
      stats: [
        { label: 'Insumos cadastrados', value: '2.500+', icon: this.icons.BOXES },
        { label: 'Movimentações/mês', value: '8.400', icon: this.icons.EXCHANGE_ALT },
        { label: 'Redução de perda', value: '35%', icon: this.icons.BELL }
      ]
    },
    {
      id: 'barter',
      title: 'Barter Marketplace',
      subtitle: 'Negocie sem intermediários',
      icon: this.icons.HANDSHAKE,
      color: 'quartenary',
      bgGradient: 'bg-gradient-to-br from-primary/90 to-squartenary/70',
      features: [
        'Troque produção por insumos',
        'Marketplace seguro e auditado',
        'Controle de créditos barter',
        'Conexão direta produtor-fornecedor'
      ],
      stats: [
        { label: 'Negociações', value: '1.200+', icon: this.icons.HANDSHAKE },
        { label: 'Toneladas negociadas', value: '3.500', icon: this.icons.BOXES },
        { label: 'Economia média', value: 'R$ 2,5M', icon: this.icons.COINS }
      ]
    }
  ];

  ngOnInit(): void {
    // Auto-rotate through phases every 5 seconds
    this.startAutoRotation();
  }

  selectPhase(index: number): void {
    this.activePhase.set(index);
  }

  private startAutoRotation(): void {
    setInterval(() => {
      const current = this.activePhase();
      const next = (current + 1) % this.phases.length;
      this.activePhase.set(next);
    }, 10000);
  }

  getPhaseClasses(index: number): string {
    const isActive = this.activePhase() === index;
    return isActive ? 'scale-105 shadow-green-lg' : 'scale-100 opacity-70 hover:opacity-100';
  }

  getConnectorClasses(index: number): string {
    const isActive = this.activePhase() >= index;
    return isActive ? 'bg-primary scale-y-100' : 'bg-neutral-secondary scale-y-0';
  }
}