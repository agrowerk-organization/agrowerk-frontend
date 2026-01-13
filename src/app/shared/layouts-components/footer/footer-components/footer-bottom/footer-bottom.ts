import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-bottom',
  standalone: true,
  imports: [],
  templateUrl: './footer-bottom.html'
})
export class FooterBottom {
  currentYear = new Date().getFullYear();

  private router = inject(Router);

  goToPrivacy() {
    this.router.navigate(['/privacy']);
  }

  goToTerms() {
    this.router.navigate(['/terms']);
  }

  goToCookies() {
    this.router.navigate(['/cookies']);
  }
}
