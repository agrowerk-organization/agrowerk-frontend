import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_DASHBOARD } from '@core/ui/icons/icons-producer/icons-dashboard/icons-dashboard';
import { Title } from "@shared/components/title/title";
import { Subtitle } from "@shared/components/subtitle/subtitle";
import { ButtonPages } from "@shared/components/buttons/button-pages/button-pages";

@Component({
  selector: 'app-onboarding-card',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    Title, 
    Subtitle, 
    ButtonPages],
  templateUrl: './onboarding-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingCard {
  private router = inject(Router);
  icons = ICONS_DASHBOARD;

  features = [
    { label: 'Propriedades',       icon: this.icons.HOME,       description: 'Gerencie fazendas, talhões e áreas' },
    { label: 'Clima em tempo real', icon: this.icons.CLOUD_SUN,  description: 'Alertas e previsão para sua região' },
    { label: 'Safras e plantios',   icon: this.icons.CHART_BAR,  description: 'Acompanhe do plantio à colheita'    },
    { label: 'Mercado',             icon: this.icons.CHART_LINE, description: 'Cotações e tendências de commodities' },
  ];

  handleAction() {
    this.router.navigate(['/producer/properties/create']);
  }
}
