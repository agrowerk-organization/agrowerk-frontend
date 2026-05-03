import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page }                        from '@core/types/page/page';
import { CreatePlantingInputRequest } from '@core/types/planting-input/create-planting-input.request';
import { PlantingInputResponse } from '@core/types/planting-input/planting-input.response';
import { environment }                 from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class PlantingInputService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/planning-inputs`;

  createPlantingInput(request: CreatePlantingInputRequest): Observable<PlantingInputResponse> {
    return this.http.post<PlantingInputResponse>(
      `${this.base}/create-planting-input`, request, { withCredentials: true }
    );
  }

  findByPlanting(plantingId: string, page = 0, size = 10): Observable<Page<PlantingInputResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<PlantingInputResponse>>(
      `${this.base}/find-by-planting/${plantingId}`, { params, withCredentials: true }
    );
  }

  findByInput(inputId: string, page = 0, size = 10): Observable<Page<PlantingInputResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<PlantingInputResponse>>(
      `${this.base}/find-by-input/${inputId}`, { params, withCredentials: true }
    );
  }
}