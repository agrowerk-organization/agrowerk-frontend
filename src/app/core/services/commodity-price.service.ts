import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Commodity } from '@core/types/market/commodity';
import { CommodityDashboardResponse } from '@core/types/market/commodity-dashboard.response';
import { CommodityPriceResponse } from '@core/types/market/commodity-price.response';
import { CommodityHistoryResponse } from '@core/types/market/commodity-history.response';

@Injectable({ providedIn: 'root' })
export class CommodityPriceService {
    private readonly base = `${environment.apiUrl}/commodity-prices`;
    private http = inject(HttpClient);
    
    getDashboard(): Observable<CommodityDashboardResponse> {
        return this.http.get<CommodityDashboardResponse>(`${this.base}/dashboard`);
      }
    
      getLatest(commodity: Commodity): Observable<CommodityPriceResponse> {
        return this.http.get<CommodityPriceResponse>(`${this.base}/latest/${commodity}`);
      }
    
      getHistory(commodity: Commodity, days = 30): Observable<CommodityHistoryResponse> {
        return this.http.get<CommodityHistoryResponse>(
          `${this.base}//history/${commodity}`,
          { params: { days } }
        );
      }
}