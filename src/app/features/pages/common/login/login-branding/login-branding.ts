import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MeshGradient } from "../../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../../shared/components/pattern/pattern";
import {  FeatureStatistic } from "./feature-statistic/feature-statistic";
import { Statistic } from '../../../../../core/ui/types/login/statistic/statistic';
import { Title } from "../../../../../shared/components/title/title";
import { Subtitle } from "../../../../../shared/components/subtitle/subtitle";
import { Icons } from "../../../../../shared/components/icons/icons";
import { ICONS_LOGIN } from '../../../../../core/ui/icons/icons-login/icons.login';

@Component({
  selector: 'app-login-branding',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MeshGradient,
    Pattern, 
    FeatureStatistic,
    Title, 
    Subtitle, 
    Icons],
  templateUrl: './login-branding.html'
})
export class LoginBranding {

  icons = ICONS_LOGIN;

  trustBadges = [
    { icon : this.icons.CLIPBOARD, label : 'Planejamento completo', description: 'Organize toda sua produção de forma adequada' },
    { icon : this.icons.LIGHTNING, label : 'Integração inteligente', description: 'Conecte todas as pontas soltas em sua produção' }, 
    { icon : this.icons.SHIELD_ALT, label: 'Conforme a legislação',  description: 'Total conformidade com normas e regulamentações' }
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
