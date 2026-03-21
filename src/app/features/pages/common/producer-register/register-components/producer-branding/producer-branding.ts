import { Component } from '@angular/core';
import { JourneyStep } from '@core/ui/types/journey-step/journey-step';
import { ICONS_PRODUCER_REGISTER } from '@core/ui/icons/icons-common/icons-producer-register/icons-producer-register';
import { ICONS_TRUST } from '@core/ui/icons/icons-common/icons-trust/icons-trust';
import { MeshGradient } from '@shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '@shared/components/pattern/pattern';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Trust } from '@core/ui/types/request-register/trust';
import STEPS_DATA from '@assets/files/register/producer/steps-producer.json';
import TRUST_DATA from '@assets/files/register/trust/trusts.json';
import { Title } from "@shared/components/title/title";
import { Subtitle } from "@shared/components/subtitle/subtitle";

@Component({
  selector: 'app-producer-branding',
  standalone: true,
  imports: [
    FontAwesomeModule,
    MeshGradient,
    Pattern,
    Title,
    Subtitle
],
  templateUrl: './producer-branding.html',
})
export class ProducerBranding {
  readonly icons = ICONS_PRODUCER_REGISTER;
  readonly trustIcons = ICONS_TRUST;

  readonly steps: JourneyStep[] = STEPS_DATA.map(step => ({
    ...step,
    icon: this.icons[step.iconKey as keyof typeof ICONS_PRODUCER_REGISTER]
  }));

  readonly trusts: Trust[] = TRUST_DATA.map(trust => ({
    ...trust,
    icon: this.trustIcons[trust.iconKey as keyof typeof ICONS_TRUST]
  }));
}
