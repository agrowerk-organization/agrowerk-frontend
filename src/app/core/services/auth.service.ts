import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../types/Auth/login.request';
import { LoginResponse } from '../types/Auth/login.response';
import { UserInfo } from '../types/User/user.info';
import { environment_development } from '../../../environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment_development.apiUrl;  

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.isLoggedSubject.asObservable();

  constructor(private http: HttpClient, private router : Router) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, {
      withCredentials: true  
    }).pipe(
        tap(() => this.setLoggedIn(true))
    );
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh`, {}, {
      withCredentials: true
    }).pipe(
        tap(() => this.setLoggedIn(true))
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true  
    }).pipe(
        tap(() => {
            this.setLoggedIn(false);
            this.router.navigate(['/']);
        })
    );
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/me`, {
      withCredentials: true
    });
  }

  checkAuthStatus(): Observable<UserInfo | null> {
    return this.getCurrentUser().pipe(
      map(user => user), 
      catchError(error => {
        if (error.status === 401) {
          this.setLoggedIn(false);  
          this.router.navigate(['/']);  
        }
        return throwError(() => error);  
      })
    );
  }

  isLogged(): boolean {
    return this.isLoggedSubject.value;
  }

  authInitialized(): Observable<boolean> {
    if (this.isLoggedSubject.value !== null) {  
      return of(true);
    }
    return this.checkAuthStatus().pipe(
      map(() => true),
      catchError(() => of(true))  
    );
  }

  private setLoggedIn(logged: boolean): void {
    this.isLoggedSubject.next(logged);
  }
}