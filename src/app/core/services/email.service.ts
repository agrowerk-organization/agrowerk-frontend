import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly http    = inject(HttpClient);
private readonly base = `${environment.apiUrl}/email-verification`;

  resendVerification(email: string): Observable<void> {
    const params = new HttpParams().set('email', email);
    return this.http.post<void>(`${this.base}/resend-verification`, null, { params });
  }

  verifyEmail(token: string): Observable<string> {
    const params = new HttpParams().set('token', token);
    return this.http.get(`${this.base}/verify-email`, { params, responseType: 'text' });
  }
}