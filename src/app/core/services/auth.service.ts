import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../types/auth/login.request';
import { environment_development } from '../../../environment/environment.dev';
import { UserInfo } from '../types/user/user.info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment_development.apiUrl;

  private isLoggedSubject = new BehaviorSubject<boolean | null>(null);
  public isLogged$ = this.isLoggedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<UserInfo | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: LoginRequest): Observable<UserInfo> {
    return this.http.post<UserInfo>(
      `${this.apiUrl}/auth/login`,
      credentials,
      { withCredentials: true }
    ).pipe(
      tap((response: UserInfo) => {
        this.setLoggedIn(true);
        this.currentUserSubject.next(response);
      })
    );
  }

  refreshToken(): Observable<UserInfo> {
    return this.http.post<UserInfo>(
      `${this.apiUrl}/auth/refresh`,
      {},
      { withCredentials: true }
    ).pipe(
      tap((response: UserInfo) => {
        this.setLoggedIn(true);
        this.currentUserSubject.next(response);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/auth/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.handleLogoutState();
        this.router.navigate(['/']);
      })
    );
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(
      `${this.apiUrl}/auth/me`,
      { withCredentials: true }
    ).pipe(
      tap((user: UserInfo) => {
        this.setLoggedIn(true);
        this.currentUserSubject.next(user); 
      })
    );
  }

  checkAuthStatus(): Observable<UserInfo | null> {
    return this.getCurrentUser().pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          return this.refreshToken().pipe(
            switchMap(() => this.getCurrentUser()),
            catchError(() => {
              this.handleLogoutState();
              return of(null);
            })
          );
        }
        this.handleLogoutState();
        return of(null);
      })
    );
  }

  redirectByRole(role: string): void {
    const routes: Record<string, string> = {
      'PRODUCER': '/producer/dashboard',
      'SYSTEM_ADMIN': '/admin/dashboard',
      'SUPPLIER_ADMIN': '/supplier/dashboard'
    };

    const path = routes[role];
    this.router.navigate([path ?? '/unauthorized']);
  }

  getCurrentRole(): string | null {
    return this.currentUserSubject.value?.role ?? null;
  }

  getUser(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  isLogged(): boolean | null {
    return this.isLoggedSubject.value;
  }

  private setLoggedIn(logged: boolean): void {
    this.isLoggedSubject.next(logged);
  }

  private handleLogoutState(): void {
    this.setLoggedIn(false);
    this.currentUserSubject.next(null);
  }
}