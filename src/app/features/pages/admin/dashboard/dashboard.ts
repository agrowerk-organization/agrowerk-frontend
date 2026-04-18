import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';
import { AdminCard } from '@core/ui/types/admin-card/admin-card';
import { ICONS_ADMIN_DASHBOARD } from '@core/ui/icons/icons-admin/icons-admin-dashboard/icons-admin-dashboard';
import ADMIN_DASHBOARD_DATA from '@assets/files/admin/dashboard-admin.json';
import { ButtonPages } from "@shared/components/buttons/button-pages/button-pages";
import { Title } from "@shared/components/title/title";
import { Subtitle } from "@shared/components/subtitle/subtitle";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    FontAwesomeModule, 
    ButtonPages, 
    Title, 
    Subtitle],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly authService = inject(AuthService);
  
  readonly router = inject(Router);
  readonly icons = ICONS_ADMIN_DASHBOARD;
  readonly currentUser = toSignal(this.authService.currentUser$);

  readonly cards: AdminCard[] = ADMIN_DASHBOARD_DATA.map(card => ({
    ...card,
    icon: this.icons[card.icon as keyof typeof ICONS_ADMIN_DASHBOARD]
  }));

  handleAction(): void {
    this.router.navigate(['/admin']);
  }
}