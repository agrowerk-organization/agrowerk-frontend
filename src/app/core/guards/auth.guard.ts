import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, take, filter, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  _, state
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const redirect = router.createUrlTree([''], {
    queryParams: { redirect: state.url }
  });

  return authService.isLogged$.pipe(
    filter(status => status !== null),
    take(1),
    map(status => status === true ? true : redirect)
  );
};