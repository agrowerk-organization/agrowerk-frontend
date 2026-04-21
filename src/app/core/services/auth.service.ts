import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../types/auth/login.request';
import { environment } from '@environments/environment';
import { UserInfo } from '../types/user/user.info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly base = `${environment.apiUrl}/auth`;

  private isLoggedSubject = new BehaviorSubject<boolean | null>(null);
  public isLogged$ = this.isLoggedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<UserInfo | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: LoginRequest): Observable<UserInfo> {
    return this.http.post<UserInfo>(
      `${this.base}/login`,
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
      `${this.base}/refresh`,
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
      `${this.base}/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => this.router.navigate(['/'])),
      catchError((err) => {
        console.error('Erro ao fazer logout no servidor', err);
        return of(void 0);
      }),
      tap(() => this.handleLogoutState()) 
    );
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(
      `${this.base}/me`,
      { withCredentials: true }
    ).pipe(
      tap((user: UserInfo) => {
        this.setLoggedIn(true);
        this.currentUserSubject.next(user); 
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isLoggedSubject.value === true; 
  }

  checkAuthStatus(): Observable<UserInfo | null> {
    if (this.isLoggedSubject.value === false) {
      return of(null);
    }
  
    return this.getCurrentUser().pipe(
      catchError(() => {
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