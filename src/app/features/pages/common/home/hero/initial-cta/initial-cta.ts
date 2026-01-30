import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Content } from '../../../../../../core/ui/types/initial-cta/content.initial-cta';
import { ICONS_INITIAL_CTA } from '../../../../../../core/ui/icons/icons.initial-cta';
import { Router } from '@angular/router';
import { BadgeIndex } from '../../../../../../core/ui/types/badge/badge';
import { Badge } from "./initial-cta-components/badge/badge";
import { Steps } from "./initial-cta-components/steps/steps";
import { Actions } from "./initial-cta-components/actions/actions";
import { Trust } from "./initial-cta-components/trust/trust";
import { MeshGradient } from "../../../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../../../shared/components/pattern/pattern";

@Component({
  selector: 'app-initial-cta',
  standalone: true,
  imports: [CommonModule, Badge, Steps, Actions, Trust, MeshGradient, Pattern],
  templateUrl: './initial-cta.html'
})
export class InitialCta {

  private router = inject(Router);

  icons = ICONS_INITIAL_CTA;

  badges: BadgeIndex[] = [
    {
      text: 'Planejamento completo',
      icon: this.icons.CLIPBOARD_CHECK
    },
    {
      text: 'Integração inteligente',
      icon: this.icons.MICROCHIP
    },
    {
      text: 'Conforme a legislação',
      icon: this.icons.SCALE_BALANCED
    }
  ]

  steps: Content[] = [
    {
      title: 'Cadastre-se gratuitamente',
      subtitle: 'Acesse todos os serviços em minutos.',
      icon: this.icons.USER_PLUS
    },
    {
      title: 'Gerencie seu inventário',
      subtitle: 'Faça uma gestão inteligente do seu inventário.',
      icon: this.icons.WAREHOUSE
    },
    {
      title: 'Automatize seu trabalho',
      subtitle: 'Use a tecnologia para automatizar seus processos.',
      icon: this.icons.GEARS
    },
    {
      title: 'Maximize sua produção',
      subtitle: 'Marketplace de barter para maximizar sua produção.',
      icon: this.icons.CHART_LINE
    }
  ];

  actions: Content[] = [
    {
      title: 'Começar agora',
      icon: this.icons.ARROW_RIGHT,
      action: () => this.goToLogin(),
      type: 'primary'
    },
    {
      title: 'Ver demonstração',
      icon: this.icons.PLAY_CIRCLE,
      action: () => this.goToDemonstration(),
      type: 'secondary'
    }
  ];

  trusts: Content[] = [
    {
      subtitle: 'Agricultores',
      quantity: 100,
      icon: this.icons.USERS,
    },
    {
      subtitle: 'Fornecedores',
      quantity: 10,
      icon: this.icons.INDUSTRY
    }, 
    {
      subtitle: 'Avaliação',
      quantity: 9.5,
      icon: this.icons.STAR
    }
  ];

  goToLogin() {
    return this.router.navigate(['/login']);
  }

  goToDemonstration() {
    return this.router.navigate(['/demonstration']);
  }
}
