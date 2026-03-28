import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment_development } from '../../../environment/environment.dev';
import { Commodity } from '@core/types/market/commodity';
import { CommodityDashboardResponse } from '@core/types/market/commodity-dashboard.response';
import { CommodityPriceResponse } from '@core/types/market/commodity-price.response';
import { CommodityHistoryResponse } from '@core/types/market/commodity-history.response';

@Injectable({ providedIn: 'root' })
export class CommodityPriceService {
    private readonly apiUrl = environment_development.apiUrl;
    private http = inject(HttpClient)
    getDashboard(): Observable<CommodityDashboardResponse> {
        return this.http.get<CommodityDashboardResponse>(`${this.apiUrl}/commodity-prices/dashboard`);
      }
    
      getLatest(commodity: Commodity): Observable<CommodityPriceResponse> {
        return this.http.get<CommodityPriceResponse>(`${this.apiUrl}/commodity-prices/latest/${commodity}`);
      }
    
      getHistory(commodity: Commodity, days = 30): Observable<CommodityHistoryResponse> {
        return this.http.get<CommodityHistoryResponse>(
          `${this.apiUrl}/commodity-prices/history/${commodity}`,
          { params: { days } }
        );
      }
}