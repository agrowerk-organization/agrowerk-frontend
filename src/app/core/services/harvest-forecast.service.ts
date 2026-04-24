import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Page } from '@core/types/page/page';
import { HarvestForecastResponse } from '@core/types/harvest/harvest-forecast.response';
@Injectable({ providedIn: 'root' })
export class HarvestForecastService {
  private readonly base = `${environment.apiUrl}/harvest-forecasts`;
  private http = inject(HttpClient);

  findByPlanting(plantingId: string, page = 0, size = 10): Observable<Page<HarvestForecastResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Page<HarvestForecastResponse>>(
      `${this.base}/find-by-planting/${plantingId}`,
      { params, withCredentials: true }
    );
  }

  findByPropertyAndSeason(propertyId: string, seasonId: string, page = 0, size = 50): Observable<Page<HarvestForecastResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Page<HarvestForecastResponse>>(
      `${this.base}/find-by-property/${propertyId}/season/${seasonId}`,
      { params, withCredentials: true }
    );
  }
}