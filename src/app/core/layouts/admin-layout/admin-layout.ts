import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { MeshGradient } from '@shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '@shared/components/pattern/pattern';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICONS_ADMIN_LAYOUT } from '@core/ui/icons/icons-admin/icons-admin-layout/icons-admin-layout';
import { UserMenu } from '@shared/layouts-components/user-menu/user-menu';
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
    UserMenu
],
  templateUrl: './admin-layout.html'
})
export class AdminLayout {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  currentUser = toSignal(this.authService.currentUser$);
  userProfile = toSignal(this.userService.getProfile());
  icons = ICONS_ADMIN_LAYOUT;


  onLogout(): void {
    this.authService.logout().subscribe();
  }

}
