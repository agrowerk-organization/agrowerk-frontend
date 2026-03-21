import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginProfileOption } from '@core/types/auth/login.profile.option';
import { ICONS_NAVBAR } from '@core/ui/icons/icons-common/icons-layouts/icons.navbar';
import { UserProfile } from '@core/types/user/user.profile';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navbar-auth.html',
})
export class NavbarAuth {
  private readonly router      = inject(Router);
  private readonly elementRef  = inject(ElementRef);

  showLoginDropdown = signal(false);

  icons = ICONS_NAVBAR;

  loginProfiles: LoginProfileOption[] = [
    { label: 'Produtor',                      role: 'producer',      icon: 'TRACTOR'      },
    { label: 'Administrador de fornecimento', role: 'supplier_admin', icon: 'USERSHIELD'   },
    { label: 'Administrador do sistema',      role: 'system_admin',  icon: 'USERGRADUATE' },
  ];

  goToLoginAs(role: UserProfile): void {
    this.router.navigate(['/login', role]);
    this.showLoginDropdown.set(false);
  }

  toggleLoginDropdown(): void {
    this.showLoginDropdown.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showLoginDropdown.set(false);
    }
  }
}