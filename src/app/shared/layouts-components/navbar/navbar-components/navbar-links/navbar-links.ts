import { Component, input } from '@angular/core';
import { ICONS_NAVBAR } from '../../../../../core/ui/icons/icons-layouts/icons.navbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-links',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-links.html',
})
export class NavbarLinks {
  isOpen = input<boolean>(false);
  icons = ICONS_NAVBAR;
}
