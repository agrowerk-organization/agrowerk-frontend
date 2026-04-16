import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketAlert } from '@core/types/market/market-alert';
import { environment } from '@environments/environment';
@Injectable({ providedIn: 'root' })
export class MarketAlertService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/market-alerts`;

  getUnread(): Observable<MarketAlert[]> {
    return this.http.get<MarketAlert[]>(`${this.base}/unread`, {
      withCredentials: true
    });
  }

  countUnread(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.base}/unread/count`, {
      withCredentials: true
    });
  }

  markAsRead(id: string): Observable<void> {
    return this.http.patch<void>(`${this.base}/${id}/read`, {}, {
      withCredentials: true
    });
  }

  markAllAsRead(): Observable<void> {
    return this.http.patch<void>(`${this.base}/read-all`, {}, {
      withCredentials: true
    });
  }
}