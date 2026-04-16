import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { of } from 'rxjs';
import { OnboardingCard } from './dashboard-components/onboarding-card/onboarding-card';
import { Router } from '@angular/router';
import { SupplierService } from '@core/services/supplier.service';
import { LayoutStateService } from '@core/services/layout-state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    OnboardingCard
  ],
  templateUrl: './dashboard.html'
})
export class SupplierDashboard {
  private supplierService = inject(SupplierService);
  private router = inject(Router);
  readonly layoutState = inject(LayoutStateService);

  readonly supplier = toSignal(
    this.supplierService.getMySupplier().pipe(
      catchError(() => of(null)
      )
    )
  );

  readonly hasSupplier = computed(() => this.supplier() !== null && this.supplier() !== undefined);
  readonly isLoading = computed(() => this.supplier() === undefined);

  goToRegister(): void {
    this.router.navigate(['supplier/register']);
  }

}
