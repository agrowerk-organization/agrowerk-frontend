import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment_development } from '@environments/environment.dev';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly http    = inject(HttpClient);
  private readonly baseUrl = `${environment_development.apiUrl}/email-verification`;

  resendVerification(email: string): Observable<void> {
    const params = new HttpParams().set('email', email);
    return this.http.post<void>(`${this.baseUrl}/resend-verification`, null, { params });
  }

  verifyEmail(token: string): Observable<string> {
    const params = new HttpParams().set('token', token);
    return this.http.get(`${this.baseUrl}/verify-email`, { params, responseType: 'text' });
  }
}