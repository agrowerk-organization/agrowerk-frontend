import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_FINAL_CTA } from '../../../../../core/ui/icons/icons.final-cta';
import { Title } from '../../../../../shared/components/title/title';
import { Subtitle } from '../../../../../shared/components/subtitle/subtitle';
import { Badge } from '../../../../../shared/components/badge/badge';
import { BadgeIndex } from '../../../../../core/ui/types/badge/badge';
import { Icons } from '../../../../../shared/components/icons/icons';
import { Carousel } from "../../../../../shared/components/carousel/carousel";

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

  trustSignals = [
    'Sem cartão de crédito',
    'Sem pagamento ou taxas',
    'Cancele quando quiser',
    'Suporte dedicado 24/7'
  ];

  badges: BadgeIndex[] = [
    {
      text: 'Sem pagamento ou taxas',
      icon: this.icons.HAND_HOLDING_DOLLAR
    },
    {
      text: 'Cancele quando quiser',
      icon: this.icons.LOCK_OPEN
    },
    {
      text: 'Suporte dedicado 24/7',
      icon: this.icons.HEADSET
    }
  ];

  trustBadges = [
    { icon : this.icons.SHIELD_ALT, label : 'LGPD', description: 'Dados seguros' },
    { icon : this.icons.LEAF, label : 'PRONAF', description: 'Agricultura familiar' },
    { icon : this.icons.CERTIFICATE, label: 'ISO 27001',  description: 'Certificado de qualidade' }
  ]

  stats = [
    { value: '500', label: 'Propriedades ativas' },
    { value: '15.000', label: 'Hectares gerenciados' },
    { value: 'R$ 1,4M', label: 'Rodando em barter' }
  ];

}
