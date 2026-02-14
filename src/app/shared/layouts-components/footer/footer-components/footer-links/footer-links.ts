import { Component, input } from '@angular/core';
import { FooterLink } from '../../../../../core/ui/types/footer/footer.link';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-links',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './footer-links.html',
})
export class FooterLinks {
  title = input.required<string>();
  links = input.required<FooterLink[]>();
}
