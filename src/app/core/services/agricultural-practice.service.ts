import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page }                              from '@core/types/page/page';
import { CreateAgriculturalPracticeRequest } from '@core/types/agricultural-practice/create-agricultural-practice.request';
import { AgriculturalPracticeResponse } from '@core/types/agricultural-practice/agricultural-pratice.response';
import { PracticeType } from '@core/enums/agricultural-practice-type';
import { environment }                       from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AgriculturalPracticeService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/agricultural-practices`;

  createPractice(request: CreateAgriculturalPracticeRequest): Observable<AgriculturalPracticeResponse> {
    return this.http.post<AgriculturalPracticeResponse>(
      `${this.base}/create-agricultural-practice`, request, { withCredentials: true }
    );
  }

  findByPlanting(plantingId: string, page = 0, size = 10): Observable<Page<AgriculturalPracticeResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<AgriculturalPracticeResponse>>(
      `${this.base}/find-by-planting/${plantingId}`, { params, withCredentials: true }
    );
  }

  findByType(plantingId: string, type: PracticeType, page = 0, size = 10): Observable<Page<AgriculturalPracticeResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<AgriculturalPracticeResponse>>(
      `${this.base}/find-by-planting-type/${plantingId}/type/${type}`, { params, withCredentials: true }
    );
  }

  getTotalCost(plantingId: string): Observable<number> {
    return this.http.get<number>(
      `${this.base}/get-total-cost-by-planting/${plantingId}/cost`, { withCredentials: true }
    );
  }

  getCostByPeriod(propertyId: string, start: string, end: string): Observable<number> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<number>(
      `${this.base}/get-cost-by-period/${propertyId}`, { params, withCredentials: true }
    );
  }
}