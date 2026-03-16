import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CycleDiagram } from '../../../shared/components/cycle-diagram/cycle-diagram';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Cycle } from '../../ui/types/cycle/cycle';
import { MeshGradient } from '../../../shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '../../../shared/components/pattern/pattern';
@Component({
  selector: 'app-producer-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    NgOptimizedImage,
    FontAwesomeModule, 
    CycleDiagram,
    MeshGradient,
    Pattern
  ],
  templateUrl: './producer-layout.html'
})
export class ProducerLayout {
  private router = inject(Router);
  private authService = inject(AuthService);

  currentUser = toSignal(this.authService.currentUser$);
  showCycle = signal(true);

  activeNodeId = computed(() => {
    const url = this.router.url;
    const map: Record<string, number> = {
      '/producer/plantings': 1,
      '/producer/fields': 2,
      '/producer/harvests': 3,
      '/producer/stock': 4,
      '/producer/barter': 5,
      '/producer/seasons': 6
    };
    return Object.entries(map)
      .find(([path]) => url.includes(path))?.[1] ?? null;
  });

  cycleNodes: Cycle[] = [
    {
      id: 1,
      label: 'Plantio',
      route: '/producer/plantings',
      description: 'Registre o início da safra e vincule insumos',
      color: '#66BB6A',
      angle: 0,
      metrics: []
    },
    {
      id: 2,
      label: 'Manejo',
      route: '/producer/fields',
      description: 'Controle aplicações e monitoramento',
      color: '#81C784',
      angle: 60,
      metrics: []
    },
    {
      id: 3,
      label: 'Colheita',
      route: '/producer/harvests',
      description: 'Rastreie a produção por lote',
      color: '#FFB74D',
      angle: 120,
      metrics: []
    },
    {
      id: 4,
      label: 'Estoque',
      route: '/producer/stock',
      description: 'Monitore a produção colhida',
      color: '#FF9800',
      angle: 180,
      metrics: []
    },
    {
      id: 5,
      label: 'Negociação',
      route: '/producer/barter',
      description: 'Marketplace barter',
      color: '#F57C00',
      angle: 240,
      metrics: []
    },
    {
      id: 6,
      label: 'Planejamento',
      route: '/producer/seasons',
      description: 'Calendário e metas de produção',
      color: '#4CAF50',
      angle: 300,
      metrics: []
    }
  ];

  onNodeNavigate(route: string): void {
    this.router.navigate([route]);
  }
}
