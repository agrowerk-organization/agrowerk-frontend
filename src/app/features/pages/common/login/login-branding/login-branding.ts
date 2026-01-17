import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Pillar } from '../../../../../core/ui/types/login/pillar/pillar';
import { MeshGradient } from "../../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../../shared/components/pattern/pattern";
import { FeaturePillar } from "./feature-pillar/feature-pillar";
import {  FeatureStatistic } from "./feature-statistic/feature-statistic";
import { Statistic } from '../../../../../core/ui/types/login/statistic/statistic';

@Component({
  selector: 'app-login-branding',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MeshGradient, Pattern, FeaturePillar, FeatureStatistic],
  templateUrl: './login-branding.html'
})
export class LoginBranding {


  featurePillars: Pillar[] = [
    {
      id: 1,
      title: 'Planejamento completo',
      description: 'Organize toda sua produção da forma adequada.',
      icon: 'assets/svgs/clipboard.svg'
    },
    {
      id: 2,
      title: 'Integração inteligente',
      description: 'Conecte todas as pontas soltas em seu inventário.',
      icon: 'assets/svgs/lightning.svg'
    },
    { 
      id: 3,
      title: 'Conforme a legislação',
      description: 'Total conformidade com normas e regulamentações.',
      icon: 'assets/svgs/shield.svg'
    }
  ];

  statistics: Statistic[] = [
    {
      value: 500,
      label: 'Propriedades',
      suffix: '+',
      current: 0
    },
    {
      value: 10000,
      label: 'Hectares',
      suffix: '+',
      current: 0
    },
    {
      value: 99,
      label: 'Satisfação',
      suffix: '%',
      current: 0
    }
  ];
}
