import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MeshGradient } from "@shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "@shared/components/pattern/pattern";
import { FeatureStatistic } from "./feature-statistic/feature-statistic";
import { Statistic } from '@core/ui/types/login/statistic/statistic';
import { Title } from "@shared/components/title/title";
import { Subtitle } from "@shared/components/subtitle/subtitle";
import { Icons } from "@shared/components/icons/icons";
import { ICONS_LOGIN } from '@core/ui/icons/icons-common/icons-login/icons.login';
import LOGIN_BRANDING_DATA from '@assets/files/login/login-branding.json';

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
    Icons
  ],
  templateUrl: './login-branding.html'
})
export class LoginBranding {
  icons = ICONS_LOGIN;

  trustBadges = LOGIN_BRANDING_DATA.trustBadges.map(badge => ({
    ...badge,
    icon: this.icons[badge.iconKey as keyof typeof ICONS_LOGIN]
  }));

  statistics: Statistic[] = LOGIN_BRANDING_DATA.statistics;
}