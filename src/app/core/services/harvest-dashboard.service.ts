import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HarvestDashboardResponse } from '@core/types/harvest/harvest-dashboard.response';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class HarvestDashboardService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/harvest-dashboard`;

  getByProperty(propertyId: string): Observable<HarvestDashboardResponse[]> {
    return this.http.get<HarvestDashboardResponse[]>(
      `${this.base}/get-by-property/${propertyId}`, { withCredentials: true }
    );
  }

  getByPlanting(plantingId: string): Observable<HarvestDashboardResponse> {
    return this.http.get<HarvestDashboardResponse>(
      `${this.base}/get-by-planting/${plantingId}`, { withCredentials: true }
    );
  }
}