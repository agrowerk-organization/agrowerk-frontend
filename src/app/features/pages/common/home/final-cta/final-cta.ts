import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_FINAL_CTA } from '@core/ui/icons/icons-common/icons-home/icons.final-cta';
import { BadgeIndex } from '@core/ui/types/badge/badge';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';
import { Badge } from '@shared/components/badge/badge';
import { Icons } from '@shared/components/icons/icons';
import { Carousel } from "@shared/components/carousel/carousel";
import FINAL_CTA_DATA from "@assets/files/home/final-cta.json";

@Component({
  selector: 'app-final-cta',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    Title,
    Subtitle,
    Badge,
    Icons,
    Carousel
],
  templateUrl: './final-cta.html',
  styleUrl: './final-cta.css',
})
export class FinalCta implements OnInit{

  private breakpoint = inject(BreakpointObserver);

  icons = ICONS_FINAL_CTA;

  isMobile = signal(false);

  ngOnInit(): void {
    this.breakpoint.observe(Breakpoints.Handset).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }

  trustSignals = FINAL_CTA_DATA.trustSignals;

  stats = FINAL_CTA_DATA.stats;

  badges: BadgeIndex[] = FINAL_CTA_DATA.badges.map(badge => ({
    ...badge,
    icon: this.icons[badge.iconKey as keyof typeof ICONS_FINAL_CTA]
  }));

  trustBadges = FINAL_CTA_DATA.trustBadges.map(badge => ({
    ...badge,
    icon: this.icons[badge.iconKey as keyof typeof ICONS_FINAL_CTA]
  }));

}
