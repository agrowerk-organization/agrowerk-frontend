import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';
import { SupplierService } from '@core/services/supplier.service';
import { SupplierCard } from '@core/ui/types/supplier-card/supplier-card';
import { SupplierResponse } from '@core/types/supplier/supplier.response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';
import { ICONS_DASHBOARD } from '@core/ui/icons/icons-supplier/icons-dashboard/icons-dashboard';
import SUPPLIER_DASHBOARD_DATA from '@assets/files/supplier/dashboard-supplier.json';

@Component({
  selector: 'app-supplier-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    ButtonPages,
    Title,
    Subtitle
  ],
  templateUrl: './dashboard.html',
})
export class SupplierDashboard implements OnInit {

  private readonly authService    = inject(AuthService);
  private readonly supplierService = inject(SupplierService);
  readonly router                  = inject(Router);
  readonly icons                   = ICONS_DASHBOARD;
  readonly currentUser             = toSignal(this.authService.currentUser$);

  supplier   = signal<SupplierResponse | null>(null);
  isLoading  = signal(true);

  hasSupplier = computed(() => !!this.supplier());

  readonly cards: SupplierCard[] = SUPPLIER_DASHBOARD_DATA.map(card => ({
    ...card,
    icon: this.icons[card.icon as keyof typeof ICONS_DASHBOARD]
  }));

  ngOnInit(): void {
    this.supplierService.getMySupplier().subscribe({
      next: s => {
        this.supplier.set(s);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  goToRegister(): void {
    this.router.navigate(['/supplier/profile']);
  }
}