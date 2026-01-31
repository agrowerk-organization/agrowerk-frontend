import { CommonModule } from '@angular/common';
import { Component, input, computed } from '@angular/core';
import { Cycle } from '../../../../../../../core/ui/types/cycle/cycle';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ICONS_HARVEST_CYCLE } from '../../../../../../../core/ui/icons/icons.harvest-cycle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-node-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './node-details.html',
  styleUrl: './node-details.css'
})

export class NodeDetails {
  node = input.required<Cycle>();

  icons = ICONS_HARVEST_CYCLE;
  
  emoji = computed(() => {
    const label = this.node().label.toLowerCase();
    const emojis: Record<string, IconDefinition> = {
      'planejamento': this.icons.CLIPBOARD_LIST,
      'plantio': this.icons.SEEDLING,
      'manejo': this.icons.TRACTOR,
      'colheita': this.icons.WHEAT_AWN,
      'estoque': this.icons.BOX,
      'negociação': this.icons.HANDSHAKE
    };
    return emojis[label] ?? this.icons.GEAR;
  });

  getMetricIcon(label: string): IconDefinition {
    const lowerLabel = label.toLowerCase();
    const icons = this.icons;
  
    if (lowerLabel.includes('safra') || lowerLabel.includes('plantio')) return icons.SEEDLING;
    if (lowerLabel.includes('alerta')) return icons.TRIANGLE_EXCLAMATION;
    if (lowerLabel.includes('colheita')) return icons.WHEAT_AWN;
    if (lowerLabel.includes('armazenado')) return icons.BOX;
    if (lowerLabel.includes('negociada') || lowerLabel.includes('oferta')) return icons.HAND_HOLDING_DOLLAR;
  
    return icons.CHART_SIMPLE;
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  getGlassContainerStyle(): Record<string, string> {
    const color = this.node().color;
    return {
      'background': 'rgba(17, 24, 20, 0.95)', 
      'backdrop-filter': 'blur(20px)',
      '-webkit-backdrop-filter': 'blur(20px)',
      'border': `1.5px solid ${color}`,
      'box-shadow': `0 0 20px ${color}33`, 
      'border-radius': '24px'
    };
  }
  getGlassMetricStyle(): Record<string, string> {
    const color = this.node().color;
    return {
      'background': 'rgba(255, 255, 255, 0.03)',
      'border': `1px solid ${color}40`, // Borda da cor do nó com 25% de opacidade
      'border-radius': '16px'
    };
  }

  getGlassIconStyle(): Record<string, string> {
    const color = this.node().color;
    return {
      'background': color,
      'box-shadow': `0 4px 15px ${color}66`,
      'border-radius': '12px'
    };
  }

  getGlassButtonStyle(): Record<string, string> {
    const color = this.node().color;
    return {
      'background': 'rgba(3, 2, 2, 0)',
      'border': `1px solid ${color}80`,
      'backdrop-filter': 'blur(10px)',
      'color': color
    };
  }

}