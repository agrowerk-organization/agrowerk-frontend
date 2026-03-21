import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MeshGradient } from '@shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '@shared/components/pattern/pattern';
import { JourneyStep } from '@core/ui/types/journey-step/journey-step';
import { Trust } from '@core/ui/types/request-register/trust';
import { ICONS_SUPPLIER_ADMIN_REGISTER } from '@core/ui/icons/icons-common/icons-supplier-admin-register/icons-supplier-admin-register';
import { ICONS_TRUST } from '@core/ui/icons/icons-common/icons-trust/icons-trust';
import SUPPLIER_STEPS_DATA from '@assets/files/register/supplier-admin/steps-supplier.json';
import TRUST_DATA from '@assets/files/register/trust/trusts.json';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';

@Component({
  selector: 'app-supplier-branding',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    MeshGradient, 
    Pattern,
    Title,
    Subtitle
  ],
  templateUrl: './supplier-admin-branding.html',
})
export class SupplierAdminBranding {
  readonly icons = ICONS_SUPPLIER_ADMIN_REGISTER;
  readonly trustIcons = ICONS_TRUST;

  readonly steps: JourneyStep[] = SUPPLIER_STEPS_DATA.map(step => ({
    ...step,
    icon: this.icons[step.iconKey as keyof typeof ICONS_SUPPLIER_ADMIN_REGISTER]
  }));

  readonly trusts: Trust[] = TRUST_DATA.map(trust => ({
    ...trust,
    icon: this.trustIcons[trust.iconKey as keyof typeof ICONS_TRUST]
  }));
}