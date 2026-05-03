import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page }                          from '@core/types/page/page';
import { CreateHarvestForecastRequest } from '@core/types/harvest-forecast/create-harvest-forecast.request';
import { UpdateHarvestForecastRequest } from '@core/types/harvest-forecast/update-harvest-forecast.request';
import { HarvestForecastResponse } from '@core/types/harvest-forecast/harvest-forecast.response';
import { environment }                   from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class HarvestForecastService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/harvest-forecasts`;

  createForecast(request: CreateHarvestForecastRequest): Observable<HarvestForecastResponse> {
    return this.http.post<HarvestForecastResponse>(
      `${this.base}/create-harvest-forecast`, request, { withCredentials: true }
    );
  }

  updateForecast(forecastId: string, request: UpdateHarvestForecastRequest): Observable<HarvestForecastResponse> {
    return this.http.put<HarvestForecastResponse>(
      `${this.base}/update-harvest-forecast/${forecastId}`, request, { withCredentials: true }
    );
  }

  findByPlanting(plantingId: string, page = 0, size = 10): Observable<Page<HarvestForecastResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<HarvestForecastResponse>>(
      `${this.base}/find-by-planting/${plantingId}`, { params, withCredentials: true }
    );
  }

  findByPropertyAndSeason(propertyId: string, seasonId: string, page = 0, size = 10): Observable<Page<HarvestForecastResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<HarvestForecastResponse>>(
      `${this.base}/find-by-property/${propertyId}/season/${seasonId}`, { params, withCredentials: true }
    );
  }

  findByPlantingAndDate(plantingId: string, forecastDate: string): Observable<HarvestForecastResponse> {
    return this.http.get<HarvestForecastResponse>(
      `${this.base}/planting/${plantingId}/date/${forecastDate}`, { withCredentials: true }
    );
  }

  findLatestByCropAndSeason(propertyId: string, seasonId: string, cropId: string, page = 0, size = 10): Observable<Page<HarvestForecastResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<HarvestForecastResponse>>(
      `${this.base}/property/${propertyId}/season/${seasonId}/crop/${cropId}/latest`, { params, withCredentials: true }
    );
  }
}