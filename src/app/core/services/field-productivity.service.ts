import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FieldProductivityResponse } from '@core/types/field/field-productivity.response';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class FieldProductivityService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/field-productivity`;

  getByField(fieldId: string): Observable<FieldProductivityResponse> {
    return this.http.get<FieldProductivityResponse>(
      `${this.base}/get-by-field/${fieldId}`, { withCredentials: true }
    );
  }
}