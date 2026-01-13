import { Component, HostListener, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginProfileOption } from '../../../../../core/types/Auth/login.profile.option';
import { ICONS_NAVBAR } from '../../../../../core/ui/icons/icons.navbar';
import { AuthService } from '../../../../../core/services/auth.service';
import { UserProfile } from '../../../../../core/types/User/user.profile';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navbar-auth.html',
})
export class NavbarAuth {
  private router = inject(Router);
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
    this.authService.logout();
    this.showProfileDropdown.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    const isLoginTrigger = target.closest('button')?.textContent?.includes('Área de acesso') || 
                           target.closest('ul')?.querySelector('li')?.textContent?.includes('Produtor'); 
    const isProfileTrigger = target.closest('button')?.textContent?.includes('Perfil') || 
                             target.closest('ul')?.querySelector('li')?.textContent?.includes('Sair');

    if (!isLoginTrigger && !isProfileTrigger) {
      this.showLoginDropdown.set(false);
      this.showProfileDropdown.set(false);
    }
  }
}
