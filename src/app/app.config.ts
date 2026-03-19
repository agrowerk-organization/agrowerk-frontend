import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptors';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { provideAppInitializer, inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { firstValueFrom } from 'rxjs';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return firstValueFrom(authService.checkAuthStatus()).catch(() => null);
    }),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};
