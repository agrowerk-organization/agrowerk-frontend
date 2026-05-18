import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BatchExpirationResponse } from '@core/types/batch/batch-expiration.response';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class BatchExpirationService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/batch-expiration-views`;

  getExpiringBatches(propertyId: string): Observable<BatchExpirationResponse[]> {
    return this.http.get<BatchExpirationResponse[]>(
      `${this.base}/get-expiring/${propertyId}`, { withCredentials: true }
    );
  }

  getCriticalBatches(propertyId: string): Observable<BatchExpirationResponse[]> {
    return this.http.get<BatchExpirationResponse[]>(
      `${this.base}/get-critical/${propertyId}`, { withCredentials: true }
    );
  }
}