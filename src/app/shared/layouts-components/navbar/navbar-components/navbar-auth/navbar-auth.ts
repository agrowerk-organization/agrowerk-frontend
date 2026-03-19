import { Component, input, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginProfileOption } from '../../../../../core/types/auth/login.profile.option';
import { ICONS_NAVBAR } from '../../../../../core/ui/icons/icons-common/icons-layouts/icons.navbar';
import { AuthService } from '../../../../../core/services/auth.service';
import { UserProfile } from '../../../../../core/types/user/user.profile';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navbar-auth.html',
})
export class NavbarAuth {
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private authService = inject(AuthService);

  isLoggedIn = input<boolean>(false); 

  showLoginDropdown = signal(false);
  showProfileDropdown = signal(false);

  icons = ICONS_NAVBAR;

  loginProfiles: LoginProfileOption[] = [
    {
      label: 'Produtor', role: 'producer', icon: 'TRACTOR' },
    {
      label: 'Administrador de fornecimento', role: 'supplier_admin', icon: 'USERSHIELD' },
    {
      label: 'Administrador do sistema', role: 'system_admin', icon: 'USERGRADUATE' }
  ];

  goToLoginAs(role: UserProfile) {
    this.router.navigate(['/login', role]);
    this.showLoginDropdown.set(false);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  toggleLoginDropdown() {
    this.showLoginDropdown.update(v => !v);
    this.showProfileDropdown.set(false);
  }

  toggleProfileDropdown() {
    this.showProfileDropdown.update(v => !v);
    this.showLoginDropdown.set(false);
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.showProfileDropdown.set(false); 
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showLoginDropdown.set(false);
      this.showProfileDropdown.set(false);
    }
  }
}
