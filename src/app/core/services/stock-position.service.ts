import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { StockPositionResponse } from '@core/types/stock/stock-position.response';

@Injectable({ providedIn: 'root' })
export class StockPositionService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/stock-position-views`;

  getPositions(propertyId: string, alert?: string): Observable<StockPositionResponse[]> {
    let params = new HttpParams();
    if (alert) params = params.set('alert', alert);
    return this.http.get<StockPositionResponse[]>(
      `${this.base}/get-positions/${propertyId}`, { params, withCredentials: true }
    );
  }
}