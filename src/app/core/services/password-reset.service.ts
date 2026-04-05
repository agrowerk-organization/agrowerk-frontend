import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment_development } from "@environments/environment.dev";

@Injectable({
    providedIn: "root",
})
export class PasswordResetService {
    private readonly apiUrl = environment_development.apiUrl;
    private http = inject(HttpClient);

    forgotPassword(email: string) {
        return this.http.post<void>(`${this.apiUrl}/password-reset/forgot-password`, { email });
      }
      
      validateResetToken(token: string) {
        return this.http.post<void>(`${this.apiUrl}/password-reset/forgot-password/validate`, { token });
      }
      
      resetPassword(payload: { token: string; newPassword: string; confirmPassword: string }) {
        return this.http.post<void>(`${this.apiUrl}/password-reset/forgot-password/reset`, payload);
      }
}