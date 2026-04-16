import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { MarketReport } from '@core/types/market/market-report';
import { ReportType } from '@core/types/market/report-type';

@Injectable({ providedIn: 'root' })
export class MarketReportService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/market-reports`;

  getLatestByType(type: ReportType): Observable<MarketReport> {
    return this.http.get<MarketReport>(`${this.base}/latest/${type}`, {
      withCredentials: true
    });
  }

  generate(type: ReportType): Observable<MarketReport> {
    return this.http.post<MarketReport>(`${this.base}/generate/${type}`, {}, {
      withCredentials: true
    });
  }
}