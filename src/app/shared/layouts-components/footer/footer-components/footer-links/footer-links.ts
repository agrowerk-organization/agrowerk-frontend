import { Component, input } from '@angular/core';
import { FooterLink } from '../../../../../core/ui/types/footer/footer.link';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer-links',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer-links.html',
})
export class FooterLinks {
  title = input.required<string>();
  links = input.required<FooterLink[]>();
}
