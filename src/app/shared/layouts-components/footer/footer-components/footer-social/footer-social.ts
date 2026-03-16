import { Component, signal } from '@angular/core';
import { ICONS_FOOTER } from '../../../../../core/ui/icons/icons-common/icons-layouts/icons.footer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { FooterApps } from "../footer-apps/footer-apps";

@Component({
  selector: 'app-footer-social',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, FooterApps],
  templateUrl: './footer-social.html',
})
export class FooterSocial {
  newsletterEmail = signal('');

  icons = ICONS_FOOTER;

  subscribeNewsletter(event: Event) {
    event.preventDefault();
    if (this.newsletterEmail) {
      this.newsletterEmail.set('');
    }
  }
}
