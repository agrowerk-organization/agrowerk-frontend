import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cycle } from '../../../../../core/ui/types/cycle/cycle';
import { CycleNode } from './harvest-cycle-components/cycle-node/cycle-node';
import { CenterHub } from './harvest-cycle-components/center-hub/center-hub';
import { NodeDetails } from './harvest-cycle-components/node-details/node-details';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ICONS_HARVEST_CYCLE } from '../../../../../core/ui/icons/icons-home/icons.harvest-cycle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Title } from "../../../../../shared/components/title/title";
import { Subtitle } from '../../../../../shared/components/subtitle/subtitle';

@Component({
  selector: 'app-harvest-cycle-diagram',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CycleNode,
    CenterHub,
    NodeDetails,
    Title,
    Subtitle
],
  templateUrl: './harvest-cycle.html',
  styleUrl: './harvest-cycle.css'
})

export class HarvestCycle {
  selectedNode = signal<number | null>(null); 
  hoveredNode = signal<number | null>(null);

  icons = ICONS_HARVEST_CYCLE;

  cycleNodes: Cycle[] = [
    {
      id: 1,
      label: 'Plantio',
      description: 'Registre o início da safra e vincule insumos utilizados',
      color: '#66BB6A',
      angle: 0,
      metrics: [
        { label: 'Em plantio', value: '85' },
        { label: 'Sementes', value: '12 ton' }
      ]
    },
    {
      id: 2,
      label: 'Manejo',
      description: 'Controle aplicações, irrigação e monitoramento contínuo',
      color: '#81C784',
      angle: 60,
      metrics: [
        { label: 'Alertas', value: '24' },
        { label: 'Aplicações', value: '156' }
      ]
    },
    {
      id: 3,
      label: 'Colheita',
      description: 'Rastreie a produção por lote e calcule produtividade',
      color: '#FFB74D',
      angle: 120,
      metrics: [
        { label: 'Em colheita', value: '42' },
        { label: 'Produtividade', value: '+40%' }
      ]
    },
    {
      id: 4,
      label: 'Estoque',
      description: 'Armazene e monitore a produção colhida em tempo real',
      color: '#FF9800',
      angle: 180,
      metrics: [
        { label: 'Armazenado', value: '3.5k ton' },
        { label: 'Disponível', value: '2.1k ton' }
      ]
    },
    {
      id: 5,
      label: 'Negociação',
      description: 'Troque produção por insumos no marketplace barter',
      color: '#F57C00',
      angle: 240,
      metrics: [
        { label: 'Ofertas ativas', value: '87' },
        { label: 'Negociadas', value: 'R$ 2.5M' }
      ]
    },
    {
      id: 6,
      label: 'Planejamento',
      description: 'Organize o calendário de plantio e defina metas de produção',
      color: '#4CAF50',
      angle: 300,
      metrics: [
        { label: 'Safras ativas', value: '320' },
        { label: 'Hectares', value: '15k+' }
      ]
    }
  ];

  selectedNodeData = computed(() => {
    return this.cycleNodes.find(node => node.id === this.selectedNode());
  })

  selectNode(nodeId: number | null): void {
    this.selectedNode.set(nodeId);
  }
  
  getEmoji(label: string): IconDefinition {
    const emojis: Record<string, IconDefinition> = {
      'Planejamento': this.icons.CLIPBOARD_LIST,
      'Plantio': this.icons.SEEDLING,
      'Manejo': this.icons.TRACTOR,
      'Colheita': this.icons.WHEAT_AWN,
      'Estoque': this.icons.BOX,
      'Negociação': this.icons.HANDSHAKE
    };
    return emojis[label] ?? this.icons.GEAR;
  }

  getGlassContainerStyle(): Record<string, string> {
    const baseColor = '#4CAF50'; 
    
    return {
      'background': 'rgba(13, 20, 15, 0.9)',
      'backdrop-filter': 'blur(24px) saturate(160%)',
      '-webkit-backdrop-filter': 'blur(24px) saturate(160%)',
      'border': `1.5px solid ${baseColor}80`,
      'box-shadow': `0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px ${baseColor}15`,
      'border-radius': '24px'
    };
  }

  getQuickButtonStyle(color: string): Record<string, string> {
    return {
      'background': 'rgba(13, 20, 15, 0.85)',
      'backdrop-filter': 'blur(12px) saturate(150%)',
      '-webkit-backdrop-filter': 'blur(12px) saturate(150%)',
      'border': `1px solid ${color}`,
      'color': color,
      'box-shadow': `0 4px 15px rgba(0, 0, 0, 0.4), 0 0 10px ${color}33`,
      'border-radius': '12px',
      'font-weight': '700',
      'transition': 'all 0.3s ease'
    };
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

}