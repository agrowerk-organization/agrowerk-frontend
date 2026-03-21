import { CommonModule } from '@angular/common';
import { Component, computed, input, output, effect, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CycleNode } from './cycle-node/cycle-node';
import { CenterHub } from './center-hub/center-hub';
import { NodeDetails } from './node-details/node-details';
import { Cycle } from '@core/ui/types/cycle/cycle';
import { ICONS_HARVEST_CYCLE } from '@core/ui/icons/icons-common/icons-home/icons.harvest-cycle';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cycle-diagram',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CycleNode, CenterHub, NodeDetails],
  templateUrl: './cycle-diagram.html',
})
export class CycleDiagram {

  nodes = input.required<Cycle[]>();
  activeNodeId = input<number | null>(null);
  navigable = input<boolean>(false);
  showDetails = input<boolean>(false);

  nodeNavigate = output<string>();

  selectedNode = signal<number | null>(null);
  hoveredNode = signal<number | null>(null);

  icons = ICONS_HARVEST_CYCLE;

  selectedNodeData = computed(() => {
    const id = this.selectedNode();
    return this.nodes().find(node => node.id === id);
  });

  constructor() {
    effect(() => {
      const active = this.activeNodeId();
      if (active !== null) {
        this.selectedNode.set(active);
      }
    });
  }

  selectNode(nodeId: number | null): void {
    this.selectedNode.set(nodeId);

    if (this.navigable() && nodeId !== null) {
      const node = this.nodes().find(n => n.id === nodeId);
      if (node?.route) {
        this.nodeNavigate.emit(node.route);
      }
    }
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
    return {
      'background': 'rgba(13, 20, 15, 0.9)',
      'backdrop-filter': 'blur(24px) saturate(160%)',
      '-webkit-backdrop-filter': 'blur(24px) saturate(160%)',
      'border': '1.5px solid #4CAF5080',
      'box-shadow': '0 12px 40px rgba(0,0,0,0.5), 0 0 20px #4CAF5015',
      'border-radius': '24px'
    };
  }

  getQuickButtonStyle(color: string): Record<string, string> {
    return {
      'background': 'rgba(13, 20, 15, 0.85)',
      'backdrop-filter': 'blur(12px) saturate(150%)',
      'border': `1px solid ${color}`,
      'color': color,
      'box-shadow': `0 4px 15px rgba(0,0,0,0.4), 0 0 10px ${color}33`,
      'border-radius': '12px',
      'font-weight': '700',
      'transition': 'all 0.3s ease'
    };
  }
}
