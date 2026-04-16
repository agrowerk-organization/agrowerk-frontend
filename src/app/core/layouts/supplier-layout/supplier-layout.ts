import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, RouterOutlet, RouterLink, Router } from '@angular/router';
import { map, filter, startWith } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { LayoutStateService } from '@core/services/layout-state.service';
import { MeshGradient } from '../../../shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '../../../shared/components/pattern/pattern';
import { ICONS_SUPPLIER_LAYOUT } from '@core/ui/icons/icons-supplier/icons-supplier-layout/icons-supplier-layout';

@Component({
  selector: 'app-supplier-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    FontAwesomeModule,
    MeshGradient,
    Pattern,
  ],
  templateUrl: './supplier-layout.html',
})
export class SupplierLayout {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly elementRef  = inject(ElementRef);
  private readonly router      = inject(Router);

  layoutState      = inject(LayoutStateService);
  currentUser      = toSignal(this.authService.currentUser$);
  userProfile      = toSignal(this.userService.getProfile());
  icons            = ICONS_SUPPLIER_LAYOUT;
  showUserDropdown = signal(false);

  toggleUserDropdown(): void {
    this.showUserDropdown.update(v => !v);
  }

  logout(): void {
    this.showUserDropdown.set(false);
    this.authService.logout().subscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showUserDropdown.set(false);
    }
  }

  isOnDashboard = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url === '/supplier/dashboard'),
      startWith(this.router.url === '/supplier/dashboard')
    )
  );
}