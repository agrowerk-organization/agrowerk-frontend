import { Component } from '@angular/core';
import { FooterBrand } from "./footer-components/footer-brand/footer-brand";
import { FooterLinks } from "./footer-components/footer-links/footer-links";
import { FooterBottom } from './footer-components/footer-bottom/footer-bottom';
import { FooterLink } from '../../../core/ui/footer/footer.link';
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
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
      external: true
    }, 
    {
      label: 'Lei da Agricultura Familiar',
      icon: this.icons.USERS,
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11326.htm',
      external: true
    },
    {
      label: 'PRONAF',
      icon: this.icons.HANDHOLDINGDOLLAR,
      url: 'https://www.gov.br/pt-br/servicos/acessar-o-programa-nacional-de-fortalecimento-da-agricultura-familiar-pronaf',
      external: true
    },
    {
      label: 'Lei da Mata Atlântica',
      icon: this.icons.TREE,
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11428.htm',
      external: true
    },
    {
      label: 'Código Florestal',
      icon: this.icons.SCALEBALANCED,
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12651.htm',
      external: true
    },
    {
      label: 'Serviços ambientais',
      icon: this.icons.LEAF,
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14119.htm',
      external: true
    },
    {
      label: 'Agricultura Urbana e Periurbana',
      icon: this.icons.BUILDINGWHEAT,
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/L14935.htm',
      external: true
    },
    {
      label: 'Fundo Garantidor de Operações',
      icon: this.icons.SHIELDHALVED,
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/L15034.htm',
      external: true
    },
    {
      label: 'Programa de Aquisição de Alimentos',
      icon: this.icons.BASKETSHOOPING,
      url: 'https://www.gov.br/secom/pt-br/acesso-a-informacao/comunicabr/lista-de-acoes-e-programas/programa-de-aquisicao-de-alimentos-paa',
      external: true
    },
    {
      label: 'Coopera Mais Brasil',
      icon: this.icons.HANDSHAKE,
      url: 'https://agenciagov.ebc.com.br/noticias/202404/coopera-mais-brasil-fortalecera-o-cooperativismo-na-agricultura-familiar',
      external: true
    },
    {
      label: 'Assistência Técnica e Extensão Rural',
      icon: this.icons.CHALKBOARDUSER,
      url: 'https://www.gov.br/agricultura/pt-br/assuntos/ater',
      external: true
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
