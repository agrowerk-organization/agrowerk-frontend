import { Component } from '@angular/core';
import { FooterBrand } from "./footer-components/footer-brand/footer-brand";
import { FooterLinks } from "./footer-components/footer-links/footer-links";
import { FooterBottom } from './footer-components/footer-bottom/footer-bottom';
import { FooterLink } from '../../../core/ui/types/footer/footer.link';
import { FooterSocial } from './footer-components/footer-social/footer-social';
import { ICONS_FOOTER } from '../../../core/ui/icons/icons.footer';
import { Pattern } from "./footer-components/pattern/pattern";

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
  icons = ICONS_FOOTER;

  legislationLinks: FooterLink[] = [
    {
      label: 'Lei Geral de Proteção de Dados',
      icon: this.icons.DATABASE,
      url: '/leis/lgpd',
    }, 
    {
      label: 'Lei da Agricultura Familiar',
      icon: this.icons.USERS,
      url: '/leis/agricultura-familiar',
    },
    {
      label: 'PRONAF',
      icon: this.icons.HANDHOLDINGDOLLAR,
      url: '/leis/pronaf',
    },
    {
      label: 'Lei da Mata Atlântica',
      icon: this.icons.TREE,
      url: '/leis/mata-atlantica',
    },
    {
      label: 'Código Florestal',
      icon: this.icons.SCALEBALANCED,
      url: '/leis/codigo-florestal',
    },
    {
      label: 'Serviços ambientais',
      icon: this.icons.LEAF,
      url: '/leis/servicos-ambientais',
    },
    {
      label: 'Agricultura Urbana e Periurbana',
      icon: this.icons.BUILDINGWHEAT,
      url: '/leis/agricultura-urbana',
    },
    {
      label: 'Fundo Garantidor de Operações',
      icon: this.icons.SHIELDHALVED,
      url: '/leis/fundo-garantidor',
    },
    {
      label: 'Programa de Aquisição de Alimentos',
      icon: this.icons.BASKETSHOOPING,
      url: '/leis/paa',
    },
    {
      label: 'Coopera Mais Brasil',
      icon: this.icons.HANDSHAKE,
      url: '/leis/coopera-mais',
    },
    {
      label: 'Assistência Técnica e Extensão Rural',
      icon: this.icons.CHALKBOARDUSER,
      url: '/leis/ater',
    },
  ];

  companyLinks: FooterLink[] = [
    { label: 'Sobre nós', icon: this.icons.INFOCIRCLE, action: () => this.goToAboutUs() },
    { label: 'Trabalhe conosco', icon: this.icons.BRIEFCASE, action: () => this.goToWorkWithUs() },
    { label: 'Blog', icon: this.icons.NEWSPAPER, action: () => this.goToBlog() },
    { label: 'Parceiros', icon: this.icons.HANDSHAKE, action: () => this.goToPartners() },
  ];

  productLinks: FooterLink[] = [
    { label: 'Funcionalidades', icon: this.icons.ROCKET, action: () => this.goToFeatures() },
    { label: 'Roadmap', icon: this.icons.MAP, action: () => this.goToRoadmap() },
    { label: 'Nossa metodologia', icon: this.icons.CHARTLINE, action: () => this.goToOurMetodology() },
    { label: 'Termos de uso', icon: this.icons.FILECONTRACT, action: () => this.goToTermsOfUse() },
    { label: 'Colabore com o desenvolvimento', icon: this.icons.COMPUTER, action: () => this.goToCode() },
  ];

  supportLinks: FooterLink[] = [
    { label: 'Central de ajuda', icon: this.icons.CIRCLEQUESTION, action: () => this.goToHelpCenter() },
    { label: 'Denuncie aqui', icon: this.icons.FLAG, action: () => this.goToComplaints() },
    { label: 'Documentação', icon: this.icons.BOOK, action: () => this.goToDocs() },
    { label: 'Contato', icon: this.icons.ENVELOPE, action: () => this.goToContact() },
    { label: 'Saúde do sistema', icon: this.icons.SERVER, action: () => this.goToHealthSystem() },
  ];

  goToAboutUs() {
    return
  }

  goToWorkWithUs() {
    return
  }

  goToBlog() {
    return
  }

  goToPartners() {
    return
  }

  goToFeatures() {
    return
  } 

  goToAPI() {
    return
  }

  goToRoadmap() {
    return
  }

  goToOurMetodology() {
    return
  }

  goToTermsOfUse() {
    return
  }

  goToCode() {
    return
  }

  goToHelpCenter() {
    return
  }

  goToComplaints() {
    return
  }
  goToDocs() {
    return
  }

  goToContact() {
    return
  }

  goToHealthSystem() {
    return
  }

}
