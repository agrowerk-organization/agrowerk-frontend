import { Component, input } from '@angular/core';
import { ICONS_NAVBAR } from '../../../../../core/ui/icons/icons.navbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar-links',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navbar-links.html',
})
export class NavbarLinks {
  isOpen = input<boolean>(false);
  icons = ICONS_NAVBAR;
}
