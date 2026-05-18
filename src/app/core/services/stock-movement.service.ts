import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '@core/types/page/page';
import { StockMovementResponse } from '@core/types/stock/stock-movement.response';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class StockMovementService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/stock-movement-view`;

  getMovements(propertyId: string, page = 0, size = 20, type?: string): Observable<Page<StockMovementResponse>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (type) {
      params = params.set('type', type);
    }

    return this.http.get<Page<StockMovementResponse>>(
      `${this.base}/get-movements/${propertyId}`, { params, withCredentials: true }
    );
  }
}