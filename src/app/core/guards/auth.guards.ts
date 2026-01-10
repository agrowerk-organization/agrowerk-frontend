import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, switchMap, of, catchError, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authInitialized().pipe(
    switchMap(initialized => {
      if (!initialized) {
        return of(router.createUrlTree(['/']));
      }

      return authService.checkAuthStatus().pipe(
        map(user => {
          if (user) {
            return true;
          }
          return router.createUrlTree(['/'], { 
            queryParams: { returnUrl: state.url } 
          });
        }),
        catchError(error => {
          return of(router.createUrlTree(['/']));
        })
      );
    })
  );
};