import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page }                   from '@core/types/page/page';
import { CreatePlantingRequest } from '@core/types/planting/create-planting.request';
import { UpdatePlantingRequest } from '@core/types/planting/update-planting.request';
import { PlantingResponse } from '@core/types/planting/planting.response';
import { environment }            from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class PlantingService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/plantings`;

  createPlanting(request: CreatePlantingRequest): Observable<PlantingResponse> {
    return this.http.post<PlantingResponse>(`${this.base}/create-planting`, request, { withCredentials: true });
  }

  updatePlanting(plantingId: string, request: UpdatePlantingRequest): Observable<PlantingResponse> {
    return this.http.put<PlantingResponse>(`${this.base}/update-planting/${plantingId}`, request, { withCredentials: true });
  }

  cancelPlanting(plantingId: string): Observable<PlantingResponse> {
    return this.http.patch<PlantingResponse>(`${this.base}/cancel-planting/${plantingId}`, {}, { withCredentials: true });
  }

  findByProperty(propertyId: string, page = 0, size = 10): Observable<Page<PlantingResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<PlantingResponse>>(`${this.base}/find-by-property/${propertyId}`, { params, withCredentials: true });
  }

  findById(plantingId: string): Observable<PlantingResponse> {
    return this.http.get<PlantingResponse>(`${this.base}/find-by-id/${plantingId}`, { withCredentials: true });
  }
}