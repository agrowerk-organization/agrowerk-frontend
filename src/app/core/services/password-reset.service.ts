import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
@Injectable({
    providedIn: "root",
})
export class PasswordResetService {
    private readonly base = `${environment.apiUrl}/password-reset`;
    private http = inject(HttpClient);

    forgotPassword(email: string) {
        return this.http.post<void>(`${this.base}/forgot-password`, { email });
      }
      
      validateResetToken(token: string) {
        return this.http.post<void>(`${this.base}/forgot-password/validate`, { token });
      }
      
      resetPassword(payload: { token: string; newPassword: string; confirmPassword: string }) {
        return this.http.post<void>(`${this.base}/forgot-password/reset`, payload);
      }
}