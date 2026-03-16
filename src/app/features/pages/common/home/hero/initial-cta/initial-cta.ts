import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Content } from '../../../../../../core/ui/types/generic/content.initial-cta';
import { ICONS_INITIAL_CTA } from '../../../../../../core/ui/icons/icons-common/icons-home/icons.initial-cta';
import { Router } from '@angular/router';
import { BadgeIndex } from '../../../../../../core/ui/types/badge/badge';
import { Badge } from "../../../../../../shared/components/badge/badge";
import { Steps } from "./initial-cta-components/steps/steps";
import { Actions } from "../../../../../../shared/components/actions/actions";
import { Trust } from "./initial-cta-components/trust/trust";
import initialCtaData from '../../../../../../../assets/files/home/initial-cta.json';
import { InitialCtaSchema, InitialCtaData } from '../../../../../../core/ui/schemas/initial-cta.schema';
@Component({
  selector: 'app-initial-cta',
  standalone: true,
  imports: [CommonModule, Badge, Steps, Actions, Trust],
  templateUrl: './initial-cta.html'
})
export class InitialCta {
  private router = inject(Router);
  icons = ICONS_INITIAL_CTA;
  private data: InitialCtaData = InitialCtaSchema.parse(initialCtaData);

  private actionMap: Record<string, () => void> = {
    login: () => this.router.navigate(['/login']),
    demonstration: () => this.router.navigate(['/demonstration']),
  };
  
  badges = signal<BadgeIndex[]>(this.data.badges.map(b => ({
    text: b.text,
    icon: this.icons[b.iconKey as keyof typeof ICONS_INITIAL_CTA],
  })));

  steps = signal<Content[]>(this.data.steps.map(s => ({
    title: s.title,
    subtitle: s.subtitle,
    icon: this.icons[s.iconKey as keyof typeof ICONS_INITIAL_CTA],
  })));

  actions = signal<Content[]>(this.data.actions.map(a => ({
    title: a.title,
    type: a.type,
    icon: this.icons[a.iconKey as keyof typeof ICONS_INITIAL_CTA],
    action: this.actionMap[a.target],
  })));

  trusts = signal<Content[]>(this.data.trusts.map(t => ({
    subtitle: t.subtitle,
    quantity: t.quantity,
    icon: this.icons[t.iconKey as keyof typeof ICONS_INITIAL_CTA],
  })));
}

