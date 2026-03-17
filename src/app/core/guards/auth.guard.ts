import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, of, catchError, take, switchMap, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  _, state
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const redirect = router.createUrlTree([''], {
    queryParams: {
      redirect: state.url
    }
  });

  return authService.isLogged$.pipe(
    take(1),
    switchMap(status => {
      if (status === true) return of(true);
      if (status === false) return of(redirect);

      return authService.checkAuthStatus().pipe(
        map(user => user ? true : redirect),
        catchError(() => of(redirect))
      );
    })
  );
};