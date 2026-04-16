import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';
import featuresData from '@assets/files/supplier/onboarding-supplier/onboarding-supplier.json';
import { ICONS_DASHBOARD } from '@core/ui/icons/icons-supplier/icons-dashboard/icons-dashboard';

@Component({
  selector: 'app-onboarding-card',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ButtonPages,
    Title,
    Subtitle
  ],
  templateUrl: './onboarding-card.html',
})
export class OnboardingCard {
  readonly register = output<void>();


  icons = ICONS_DASHBOARD;

  readonly features = featuresData.map(feature => ({
    ...feature,
    icon: this.icons[feature.iconKey as keyof typeof ICONS_DASHBOARD]
  }));

  handleRegister(): void {
    this.register.emit();
  }
}