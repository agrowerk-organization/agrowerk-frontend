import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment_development } from '../../../environment/environment.dev';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!req.url.startsWith(environment_development.apiUrl)) {
    return next(req);
  }

  const authReq = req.clone({ withCredentials: true });

  const isExcluded = 
    req.url.includes('/auth/refresh') ||
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/me'); 

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401 && !isExcluded) {
        return authService.refreshToken().pipe(
          switchMap(() => next(authReq)),
          catchError((refreshError) => {

            if (authService.isAuthenticated()) {
              authService.logout().subscribe();
              router.navigate(['/']);
            }
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};