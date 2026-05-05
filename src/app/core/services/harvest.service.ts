import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page }             from '@core/types/page/page';
import { CreateHarvestRequest } from '@core/types/harvest/create-harvest-response';
import { HarvestResponse } from '@core/types/harvest/harvest.response';
import { environment }      from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class HarvestService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/harvests`;

  createHarvest(request: CreateHarvestRequest): Observable<HarvestResponse> {
    return this.http.post<HarvestResponse>(`${this.base}/create-harvest`, request, { withCredentials: true });
  }

  finalizeHarvest(harvestId: string): Observable<HarvestResponse> {
    return this.http.patch<HarvestResponse>(`${this.base}/finalize-harvest/${harvestId}`, {}, { withCredentials: true });
  }

  findByPlanting(plantingId: string): Observable<HarvestResponse> {
    return this.http.get<HarvestResponse>(`${this.base}/find-by-planting/${plantingId}`, { withCredentials: true });
  }

  findByProperty(propertyId: string, page = 0, size = 10): Observable<Page<HarvestResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<HarvestResponse>>(`${this.base}/find-by-property/${propertyId}`, { params, withCredentials: true });
  }
}