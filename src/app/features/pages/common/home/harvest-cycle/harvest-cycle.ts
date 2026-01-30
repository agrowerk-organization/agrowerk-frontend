/*import { Component } from '@angular/core';

@Component({
  selector: 'app-harvest-cycle',
  imports: [],
  templateUrl: './harvest-cycle.html',
  styleUrl: './harvest-cycle.css',
})
export class HarvestCycle {

} */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

interface CycleNode {
  id: string;
  label: string;
  description: string;
  color: string;
  angle: number; 
  metrics?: {
    label: string;
    value: string;
  }[];
}

@Component({
  selector: 'app-harvest-cycle-diagram',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="relative w-full max-w-4xl mx-auto aspect-square">
      <!-- Center Hub -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div class="w-32 h-32 rounded-full flex items-center justify-center shadow-green-lg cursor-pointer hover:scale-110 transition-transform duration-300"
          (click)="selectNode(null)"
          (keydown.enter)="selectNode(null)"
          role="button"
          tabindex="0">
          <div class="text-center">
            <svg class="w-12 h-12 mx-auto text-neutral-tertiary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p class="text-xs font-bold text-neutral-tertiary">AgroWerk</p>
          </div>
        </div>
      </div>

      @for (node of cycleNodes; track node.id) {
        <div 
          class="absolute w-24 h-24 cursor-pointer transition-all duration-300 hover:scale-125 z-10"
          [style.top.%]="getNodePosition(node.angle).y"
          [style.left.%]="getNodePosition(node.angle).x"
          [class]="selectedNode() === node.id ? 'scale-125' : 'scale-100'"
          (click)="selectNode(node.id)"
          (keyword.enter)="selectNode(node.id)"
          role="button"
          tabindex="0"
          (mouseenter)="hoveredNode.set(node.id)"
          (mouseleave)="hoveredNode.set(null)"
        >
          <div 
            class="w-full h-full rounded-full flex items-center justify-center shadow-lg border-4 transition-all duration-300"
            [style.background-color]="node.color"
            [class]="selectedNode() === node.id ? 'border-neutral-tertiary' : 'border-transparent'"
          >
            <span class="text-2xl">{{ getNodeEmoji(node.id) }}</span>
          </div>
          
          <!-- Label -->
          <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p class="text-xs font-semibold text-neutral-tertiary text-center">{{ node.label }}</p>
          </div>

          <!-- Connecting Line to Center -->
          <svg 
            class="absolute top-1/2 left-1/2 pointer-events-none transition-opacity duration-300"
            [class]="selectedNode() === node.id || hoveredNode() === node.id ? 'opacity-100' : 'opacity-20'"
            [style.width.px]="getConnectionLength()"
            [style.height.px]="getConnectionLength()"
            [style.transform]="getConnectionTransform(node.angle)"
          >
            <line 
              x1="0" 
              y1="0" 
              [attr.x2]="getConnectionLength()" 
              [attr.y2]="getConnectionLength()" 
              stroke="currentColor"
              [attr.stroke]="node.color"
              stroke-width="2"
              stroke-dasharray="5,5"
            />
          </svg>
        </div>
      }

      <!-- Details Panel -->
      @if (selectedNode()) {
        <div class="absolute -bottom-40 left-0 right-0 mx-auto max-w-md rounded-2xl p-6 border border-primary/30 animate-fadeInUp">
          @for (node of cycleNodes; track node.id) {
            @if (selectedNode() === node.id) {
              <h3 class="text-xl font-bold text-primary mb-2">{{ node.label }}</h3>
              <p class="text-sm text-neutral-secondary mb-4">{{ node.description }}</p>
              
              @if (node.metrics) {
                <div class="grid grid-cols-2 gap-3">
                  @for (metric of node.metrics; track metric.label) {
                    <div class="bg-neutral-primary/50 rounded-lg p-3">
                      <p class="text-xs text-neutral-secondary">{{ metric.label }}</p>
                      <p class="text-lg font-bold text-primary">{{ metric.value }}</p>
                    </div>
                  }
                </div>
              }
            }
          }
        </div>
      }

      <!-- Rotation Animation -->
      <div class="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow"></div>
    </div>
  `,
  styles: [`
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .animate-spin-slow {
      animation: spin-slow 60s linear infinite;
    }
  `]
})
export class HarvestCycleDiagramComponent {
  selectedNode = signal<string | null>('safra');
  hoveredNode = signal<string | null>(null);

  cycleNodes: CycleNode[] = [
    {
      id: 'safra',
      label: 'Planejamento',
      description: 'Organize o calendário de plantio e defina metas de produção',
      color: '#4CAF50',
      angle: 0,
      metrics: [
        { label: 'Safras ativas', value: '320' },
        { label: 'Hectares', value: '15k+' }
      ]
    },
    {
      id: 'plantio',
      label: 'Plantio',
      description: 'Registre o início da safra e vincule insumos utilizados',
      color: '#66BB6A',
      angle: 60,
      metrics: [
        { label: 'Em plantio', value: '85' },
        { label: 'Sementes', value: '12 ton' }
      ]
    },
    {
      id: 'manejo',
      label: 'Manejo',
      description: 'Controle aplicações, irrigação e monitoramento contínuo',
      color: '#81C784',
      angle: 120,
      metrics: [
        { label: 'Alertas', value: '24' },
        { label: 'Aplicações', value: '156' }
      ]
    },
    {
      id: 'colheita',
      label: 'Colheita',
      description: 'Rastreie a produção por lote e calcule produtividade',
      color: '#FFB74D',
      angle: 180,
      metrics: [
        { label: 'Em colheita', value: '42' },
        { label: 'Produtividade', value: '+40%' }
      ]
    },
    {
      id: 'estoque',
      label: 'Estoque',
      description: 'Armazene e monitore a produção colhida em tempo real',
      color: '#FF9800',
      angle: 240,
      metrics: [
        { label: 'Armazenado', value: '3.5k ton' },
        { label: 'Disponível', value: '2.1k ton' }
      ]
    },
    {
      id: 'barter',
      label: 'Negociação',
      description: 'Troque produção por insumos no marketplace barter',
      color: '#F57C00',
      angle: 300,
      metrics: [
        { label: 'Ofertas ativas', value: '87' },
        { label: 'Negociadas', value: 'R$ 2.5M' }
      ]
    }
  ];

  selectNode(nodeId: string | null): void {
    this.selectedNode.set(nodeId);
  }

  getNodePosition(angle: number): { x: number, y: number } {
    const radius = 35; // Percentage from center
    const radian = (angle - 90) * (Math.PI / 180);
    
    return {
      x: 50 + radius * Math.cos(radian) - 12, // -12 to center the node (24/2)
      y: 50 + radius * Math.sin(radian) - 12
    };
  }

  getConnectionLength(): number {
    return 200; // Approximate distance from center to node
  }

  getConnectionTransform(angle: number): string {
    return `translate(-50%, -50%) rotate(${angle - 90}deg)`;
  }

  getNodeEmoji(nodeId: string): string {
    const emojis: Record<string, string> = {
      'safra': '📋',
      'plantio': '🌱',
      'manejo': '🚜',
      'colheita': '🌾',
      'estoque': '📦',
      'barter': '🤝'
    };
    return emojis[nodeId] || '⚙️';
  }
}
