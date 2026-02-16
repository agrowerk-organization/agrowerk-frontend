import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Breadcrumb } from "../../../../shared/components/breadcrumb/breadcrumb";
import { ICONS_ABOUT_US } from '../../../../core/ui/icons/icons-about-us/icons.about-us';
import { Title } from "../../../../shared/components/title/title";
import { Subtitle } from "../../../../shared/components/subtitle/subtitle";
import { MeshGradient } from "../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../shared/components/pattern/pattern";
import { MissionVision } from "./about-us-components/mission-vision/mission-vision";
import { Value } from '../../../../core/ui/types/about-us/value';
import { ValuesGrid } from "./about-us-components/values-grid/values-grid";
import { Timeline } from "./about-us-components/timeline/timeline";
import { Milestone } from '../../../../core/ui/types/about-us/milestone';
import { TeamMember } from '../../../../core/ui/types/about-us/team-member';
import { TextTitle } from "../../../../shared/components/text-title/text-title";
import { Team } from './about-us-components/team/team';
import { Actions } from '../../../../shared/components/actions/actions';
import { Content } from '../../../../core/ui/types/generic/content.initial-cta';
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    Breadcrumb,
    Title,
    Subtitle,
    MeshGradient,
    Pattern,
    MissionVision,
    ValuesGrid,
    Team,
    Timeline,
    TextTitle,
    Actions
],
  templateUrl: './about-us.html'
})
export class AboutUs {
  icons = ICONS_ABOUT_US;

  actions: Content[] = [
    {
      title: 'Começar agora',
      icon: this.icons.ARROW_RIGHT,
      action: () => this.goToRegister(),
      type: 'primary'
    },
    {
      title: 'Entre em contato',
      icon: this.icons.CONTACT_CARD,
      action: () => this.goToContact(),
      type: 'secondary'
    }
  ];

  goToRegister() {
    return
  }

  goToContact() {
    return
  }

  values: Value[] = [
    {
      icon: this.icons.HANDSHAKE,
      label: 'Comprometimento',
      description: 'Promovemos e operamos com um comprometimento com os nossos clientes, fornecedores e produtores.'
    },
    {
      icon: this.icons.LEAF,
      label: 'Sustentabilidade',
      description: 'Promovemos práticas que respeitam o meio ambiente e garantem a produção para as próximas gerações.'  
  }, 
    {
      icon: this.icons.USERS,
      label: 'Colaboração',
      description: 'Acreditamos que juntos somos melhores e, por essa razão, conectamos os diversos atores da cadeia produtiva.'
    },
    {
      icon: this.icons.CHART_LINE,
      label: 'Inovação',  
      description: 'Estamos em busca constante por soluções inovadores e tecnológicas para a resolução de problemas no campo.'
    }
  ];

  milestones: Milestone[] = [
    { year: 2022, title: 'Fundação', description: 'AgroWerk nasce com a missão de digitalizar o agronegócio' },
    { year: 2023, title: '100 Produtores', description: 'Alcançamos a marca de 100 produtores ativos na plataforma' },
    { year: 2024, title: 'Marketplace Barter', description: 'Lançamento do marketplace de barter, revolucionando negociações' },
    { year: 2025, title: '500+ Produtores', description: '15.000 hectares gerenciados e R$ 2,5M economizados' },
    { year: 2026, title: 'Expansão', description: 'Presença em 10 estados e 1.000+ produtores' }
  ];

  team: TeamMember[] = [
    {
      id: 1,
      name: 'Douglas Holanda',
      role: 'CEO & Co-Founder',
      bio: 'Desenvolvedor Fullstack com foco em desenvolvimento de soluções para agricultura.',
      avatar: 'https://avatars.githubusercontent.com/u/129301271?v=4',
      linkedin: 'https://linkedin.com/in/joaosilva'
    },
    {
      id: 2,
      name: 'Maria Santos',
      role: 'CTO & Co-Founder',
      bio: 'Engenheira agrônoma com mais de 10 anos de experiência na agricultura.',
      avatar: 'https://avatars.githubusercontent.com/u/129301271?v=4',
      linkedin: 'https://avatars.githubusercontent.com/u/129301271?v=4',
      github: 'https://github.com/mariasantos'
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      role: 'Head of Product',
      bio: 'Product Manager com foco em UX para o agronegócio e similares.',
      avatar: 'https://avatars.githubusercontent.com/u/129301271?v=4',
      linkedin: 'https://linkedin.com/in/carlosoliveira'
    },
    {
      id: 4,
      name: 'Ana Costa',
      role: 'Head of Sales',
      bio: 'Especialista em vendas B2B voltadas para o mercado agrícola.',
      avatar: 'https://avatars.githubusercontent.com/u/129301271?v=4',
      linkedin: 'https://linkedin.com/in/anacosta'
    }
  ];

  stats = [
    { value: '500+', label: 'Produtores Ativos' },
    { value: '15.000+', label: 'Hectares Gerenciados' },
    { value: 'R$ 2,5M', label: 'Economizados' },
    { value: '10', label: 'Estados Presentes' }
  ];
}
