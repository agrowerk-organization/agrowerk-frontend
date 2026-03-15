import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, of, catchError, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route, state
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged()) {
    return of(true);
  }

  return authService.checkAuthStatus().pipe(
    map(user => user ? true : router.createUrlTree(['/'], {
      queryParams: { returnUrl: state.url }
    })),
    catchError(() => of(router.createUrlTree(['/'], {
      queryParams: { returnUrl: state.url }
    })))
  );
};