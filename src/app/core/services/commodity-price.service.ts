import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Commodity } from '@core/enums/commodity';
import { CommodityDashboardResponse } from '@core/types/market/commodity-dashboard.response';
import { CommodityPriceResponse } from '@core/types/market/commodity-price.response';
import { CommodityHistoryResponse } from '@core/types/market/commodity-history.response';

@Injectable({ providedIn: 'root' })
export class CommodityPriceService {
  private readonly base = `${environment.apiUrl}/commodity-prices`;
  private http = inject(HttpClient);
  
  getDashboard(): Observable<CommodityDashboardResponse> {
      return this.http.get<CommodityDashboardResponse>(`${this.base}/dashboard`, { 
          withCredentials: true 
      });
  }
  
  getLatest(commodity: Commodity): Observable<CommodityPriceResponse> {
      return this.http.get<CommodityPriceResponse>(`${this.base}/latest/${commodity}`, { 
          withCredentials: true 
      });
  }
  
  getHistory(commodity: Commodity, days = 30): Observable<CommodityHistoryResponse> {
      const params = new HttpParams().set('days', days.toString());
      
      return this.http.get<CommodityHistoryResponse>(`${this.base}/history/${commodity}`, { 
          params, 
          withCredentials: true 
      });
  }
}