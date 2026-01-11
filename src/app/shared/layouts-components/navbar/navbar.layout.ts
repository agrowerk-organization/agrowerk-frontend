import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription, filter } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
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
    NavbarMobileToggle
  ],
  templateUrl: './navbar.layout.html'
})
export class NavbarLayout implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoggedIn = toSignal(this.authService?.isLogged$, { initialValue: false});

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
}
