import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FooterBrand } from "./footer-components/footer-brand/footer-brand";
import { FooterLinks } from "./footer-components/footer-links/footer-links";
import { FooterBottom } from './footer-components/footer-bottom/footer-bottom';
import { FooterSocial } from './footer-components/footer-social/footer-social';
import { ICONS_FOOTER } from '../../../core/ui/icons/icons-layouts/icons.footer';
import { Pattern } from "./footer-components/pattern/pattern";
import footerData from '../../../../assets/files/footer/footer-links.json';
import { FooterLink } from '../../../core/ui/types/footer/footer.link';
import { FooterLinksDataSchema, FooterLinksData } from '../../../core/ui/schemas/footer-links.schema';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    FooterBrand,
    FooterLinks,
    FooterBottom,
    FooterSocial,
    FooterBottom,
    Pattern
],
  templateUrl: './footer.layout.html'
})
export class FooterLayout {
  private router = inject(Router);
  private data: FooterLinksData = FooterLinksDataSchema.parse(footerData);

  icons = ICONS_FOOTER;

  private actionMap: Record<string, () => void> = {
    aboutUs: () => this.router.navigate(['/sobre-nos']),
    workWithUs: () => this.router.navigate(['/trabalhe-conosco']),
    blog: () => this.router.navigate(['/blog']),
    partners: () => this.router.navigate(['/parceiros']),
    features: () => this.router.navigate(['/funcionalidades']),
    api: () => this.router.navigate(['/api']),
    roadmap: () => this.router.navigate(['/roadmap']),
    methodology: () => this.router.navigate(['/metodologia']),
    terms: () => this.router.navigate(['/termos']),
    code: () => window.open('https://github.com/my-repo', '_blank'), 
    helpCenter: () => this.router.navigate(['/ajuda']),
    complaints: () => this.router.navigate(['/denuncie']),
    docs: () => this.router.navigate(['/documentacao']),
    contact: () => this.router.navigate(['/contato']),
    health: () => this.router.navigate(['/status-sistema']),
  };

  legislationLinks: FooterLink[] = this.data.legislationLinks.map(link => ({
    ...link,
    icon: this.icons[link.iconKey as keyof typeof ICONS_FOOTER],
    action: this.actionMap[link.url!]
  }));

  companyLinks: FooterLink[] = this.mapLinksWithAction(this.data.companyLinks);
  productLinks: FooterLink[] = this.mapLinksWithAction(this.data.productLinks);
  supportLinks: FooterLink[] = this.mapLinksWithAction(this.data.supportLinks);

  private mapLinksWithAction(links: FooterLinksData['companyLinks']): FooterLink[] {
    return links.map(link => ({
      label: link.label,
      icon: this.icons[link.iconKey as keyof typeof ICONS_FOOTER],
      action: link.url && this.actionMap[link.url] 
        ? this.actionMap[link.url] 
        : undefined
    }));
  }
}
