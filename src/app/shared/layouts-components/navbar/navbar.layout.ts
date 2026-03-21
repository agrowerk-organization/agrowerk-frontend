import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { NavbarLinks } from './navbar-components/navbar-links/navbar-links';
import { NavbarAuth } from './navbar-components/navbar-auth/navbar-auth';
import { NavbarMobileToggle } from './navbar-components/navbar-mobile-toggle/navbar-mobile-toggle';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavbarLinks,
    NavbarAuth,
    NavbarMobileToggle,
    RouterLink
  ],
  templateUrl: './navbar.layout.html'
})
export class NavbarLayout implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  openMenu = signal(false);
  private routerSubscription!: Subscription;

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.openMenu.set(false);
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.openMenu.update(open => !open);
  }

  closeMenu() {
    this.openMenu.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('nav') && this.openMenu()) {
      this.closeMenu();
    }
  }

  @HostListener('document:touchend', ['$event'])
  onDocumentTouch(event: TouchEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('nav') && this.openMenu()) {
      this.closeMenu();
    }
  }
}