import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../types/auth/login.request';
import { LoginResponse } from '../types/auth/login.response';
import { environment_development } from '../../../environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment_development.apiUrl;

  private isLoggedSubject = new BehaviorSubject<boolean | null>(null);
  public isLogged$ = this.isLoggedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      credentials,
      { withCredentials: true }
    ).pipe(
      tap(response => {
        this.setLoggedIn(true);
        this.currentUserSubject.next(response);
      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/refresh`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => this.setLoggedIn(true))
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/auth/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.setLoggedIn(false);
        this.currentUserSubject.next(null); 
        this.router.navigate(['/']);
      })
    );
  }

  getCurrentUser(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(
      `${this.apiUrl}/users/get/me`,
      { withCredentials: true }
    ).pipe(
      tap(user => {
        this.setLoggedIn(true);
        this.currentUserSubject.next(user); 
      })
    );
  }

  checkAuthStatus(): Observable<LoginResponse | null> {
    return this.getCurrentUser().pipe(
      catchError(error => {
        if (error.status === 401) {
          this.setLoggedIn(false);
          this.currentUserSubject.next(null);
        }
        return throwError(() => error);
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

  getUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  isLogged(): boolean | null {
    return this.isLoggedSubject.value;
  }

  private setLoggedIn(logged: boolean): void {
    this.isLoggedSubject.next(logged);
  }
}