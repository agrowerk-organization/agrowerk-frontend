import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserRole } from '../../../../../core/ui/types/benefit/user-role';
import { RoleBenefit } from '../../../../../core/ui/types/benefit/benefit-role';
import { ICONS_BENEFITS } from '../../../../../core/ui/icons/icons-home/icons.benefits';
import { BenefitCard } from './benefits-components/benefit-card/benefit-card';
import { RoleTabButton } from './benefits-components/role-tab-button/role-tab-button';
import { Carousel } from '../../../../../shared/components/carousel/carousel';
import { Title } from "../../../../../shared/components/title/title";
import { Subtitle } from '../../../../../shared/components/subtitle/subtitle';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    Carousel,
    BenefitCard,
    RoleTabButton,
    Title,
    Subtitle
],
  templateUrl: './benefits.html'
})

export class Benefits {
  activeRole = signal<UserRole>('producer');

  icons = ICONS_BENEFITS; 
  
  public readonly TAB_ICONS = {
    producer: this.icons.TRACTOR,
    supplier: this.icons.WAREHOUSE
  }

  public currentBenefits = computed(() => {
    return this.roleBenefits[this.activeRole()];
  }); 

  roleBenefits : Record<UserRole, RoleBenefit> = {
    producer: {
      id: 1,
      title: 'Para produtores rurais',
      subtitle: 'Maximize sua produtividade e lucro',
      icon: this.activeRole() === 'producer' ? this.icons.TRACTOR : this.icons.TRACTOR,
        benefits: [
          {
          id: 1,
          title: 'Reduza desperdicios',
          description: 'Reduza desperdicios e aumente a produtividade.',
          icon: this.icons.WASTE,
          metric: {
            value: '85%',
            label: 'menos desperdicio'
          }
        },
        {
          id: 2,
          title: 'Economize custos',
          description: 'Negocie diretamente no marketplace barter sem intermediários. Troque sua produção por insumos com economia real.',
          icon: this.icons.BARTER_PRODUCER,
          metric: {
            value: 'R$ 10.000',
            label: 'economia média'
          }
        },
        {
          id: 3,
          title: 'Planeje sua produção',
          description: 'Planeje melhor com estimativas precisas baseadas em clima, solo e histórico. Antecipe problemas antes que aconteçam.',         
          icon: this.icons.SPROUT,
          metric: {
            value: '78%',
            label: 'de precisão'
          }
        },
        {
          id: 4,
          title: 'Observe em tempo real',
          description: 'Visualize todos os KPIs da sua operação em um único lugar: estoque, safras, alertas e finanças integrados.',          
          icon: this.icons.REAL_TIME,
          metric: {
            value: '24/7',
            label: 'monitoramento'
          }
        }
      ]
    },
    supplier: {
      id: 2,
      title: 'Para fornecedores',
      subtitle: 'Expanda seus negócios e reduza custos de operação',
      icon: this.activeRole() === 'supplier' ? this.icons.WAREHOUSE : this.icons.WAREHOUSE,
      benefits: [
        {
          id: 1,
          title: 'Acesse 100+ produtores ativos',
          description: 'Conecte-se diretamente com uma base crescente de produtores qualificados em todo o Brasil sem intermediários.',
          icon: this.icons.USERS,
          metric: {
            value: '100+',
            label: 'potenciais clientes'
          }
        },
        {
          id: 2,
          title: 'Marketplace integrado',
          description: 'Venda e troque produtos sem comissão de plataforma. Gerencie ofertas, negociações e contratos em um só lugar.',     
          icon: this.icons.STORE,
          metric: {
            value: '0%',
            label: 'de comissão'
          }
        },
        {
          id: 3,
          title: 'Analise e planeje',
          description: 'Entenda o que os produtores estão procurando com dashboards de demanda em tempo real e previsões de mercado.',         
          icon: this.icons.MARKET_ANALYSIS, 
          metric: {
            value: '78%',
            label: 'de precisão'
          }
        },
        {
          id: 4,
          title: 'Gestão de barter',
          description: 'Controle total de operações de troca e créditos. Rastreie histórico, saldos e vencimentos automaticamente.',         
          icon: this.icons.BARTER_MANAGEMENT,
          metric: {
            value: 'R$ 10.000',
            label: 'economia média'
          }
        }
      ]
    }
  };

  selectRole(role: UserRole): void {
    this.activeRole.set(role);
  }

  getTabClasses(role: UserRole): string {
    const isActive = this.activeRole() === role;
    return isActive
      ? 'bg-primary text-neutral-tertiary shadow-green-lg'
      : 'bg-neutral-primary/40 text-neutral-secondary hover:bg-neutral-primary/60 hover:text-neutral-tertiary';
  }
}
