import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserRole } from '../../../../../core/ui/types/benefit/user-role';
import { RoleBenefit } from '../../../../../core/ui/types/benefit/benefit-role';
import { ICONS_BENEFITS } from '../../../../../core/ui/icons/icons-common/icons-home/icons.benefits';
import { BenefitCard } from './benefits-components/benefit-card/benefit-card';
import { RoleTabButton } from './benefits-components/role-tab-button/role-tab-button';
import { Carousel } from '../../../../../shared/components/carousel/carousel';
import { Title } from "../../../../../shared/components/title/title";
import { Subtitle } from '../../../../../shared/components/subtitle/subtitle';
import BENEFITS_DATA from '../../../../../../assets/files/home/benefits.json';

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
    producer: this.icons[BENEFITS_DATA.tabIcons.producer as keyof typeof ICONS_BENEFITS],
    supplier: this.icons[BENEFITS_DATA.tabIcons.supplier as keyof typeof ICONS_BENEFITS]
  };

  private resolveRole(key: string): RoleBenefit {
    const raw = BENEFITS_DATA.roleBenefits[key as UserRole];
    return {
      ...raw,
      icon: this.icons[raw.iconKey as keyof typeof ICONS_BENEFITS],
      benefits: raw.benefits.map(benefit => ({
        ...benefit,
        icon: this.icons[benefit.iconKey as keyof typeof ICONS_BENEFITS]
      }))
    };
  }

  roleBenefits: Record<UserRole, RoleBenefit> = {
    producer: this.resolveRole('producer'),
    supplier: this.resolveRole('supplier')
  };

  public currentBenefits = computed(() => this.roleBenefits[this.activeRole()]);

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