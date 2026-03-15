import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as string;
  const userRole = authService.getCurrentRole();

  if (userRole === requiredRole) {
    return true;
  }

  const roleRoutes: Record<string, string> = {
    'PRODUCER': '/producer/dashboard',
    'SYSTEM_ADMIN': '/admin/dashboard',
    'SUPPLIER_ADMIN': '/supplier/dashboard'
  };

  if (userRole && roleRoutes[userRole]) {
    router.navigate([roleRoutes[userRole]]);
    return false;
  }

  router.navigate(['/unauthorized']);
  return false;
};