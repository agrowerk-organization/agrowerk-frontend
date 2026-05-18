import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivePlantingResponse } from '@core/types/planting/active-planting.response';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ActivePlantingService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/active-planting`;

  getByPlanting(plantingId: string): Observable<ActivePlantingResponse> {
    return this.http.get<ActivePlantingResponse>(
      `${this.base}/get-by-planting/${plantingId}`, { withCredentials: true }
    );
  }

  getByProperty(propertyId: string): Observable<ActivePlantingResponse[]> {
    return this.http.get<ActivePlantingResponse[]>(
      `${this.base}/get-by-property/${propertyId}`, { withCredentials: true }
    );
  }
}