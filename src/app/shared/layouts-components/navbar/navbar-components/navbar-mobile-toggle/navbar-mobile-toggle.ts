import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-navbar-mobile-toggle',
  standalone: true,
  imports: [],
  templateUrl: './navbar-mobile-toggle.html'
})
export class NavbarMobileToggle {
  isOpen = input<boolean>(false);
  menuToggle = output<void>();
}
