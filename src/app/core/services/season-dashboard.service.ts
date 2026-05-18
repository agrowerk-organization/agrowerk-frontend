import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeasonDashboardResponse } from '@core/types/season/season-dashboard.response';
import { environment }             from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class SeasonDashboardService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/season-dashboard`;

  getDashboard(propertyId: string): Observable<SeasonDashboardResponse[]> {
    return this.http.get<SeasonDashboardResponse[]>(
      `${this.base}/get-dashboard/${propertyId}`, { withCredentials: true }
    );
  }

  getDashboardBySeason(seasonId: string): Observable<SeasonDashboardResponse[]> {
    return this.http.get<SeasonDashboardResponse[]>(
      `${this.base}/get-by-season/${seasonId}`, { withCredentials: true }
    );
  }
}