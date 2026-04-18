import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { MeshGradient } from '@shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '@shared/components/pattern/pattern';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICONS_ADMIN_LAYOUT } from '@core/ui/icons/icons-admin/icons-admin-layout/icons-admin-layout';
import { Title } from "@shared/components/title/title";
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    FontAwesomeModule,
    MeshGradient,
    Pattern,
    Title
],
  templateUrl: './admin-layout.html'
})
export class AdminLayout {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly elementRef = inject(ElementRef);

  currentUser = toSignal(this.authService.currentUser$);
  userProfile = toSignal(this.userService.getProfile());
  icons = ICONS_ADMIN_LAYOUT;
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

}
