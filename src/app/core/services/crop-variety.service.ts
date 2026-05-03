import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '@core/types/page/page';
import { CreateCropVarietyRequest } from '@core/types/crop-variety/create-crop-variety.request';
import { UpdateCropVarietyRequest } from '@core/types/crop-variety/update-crop-variety.request';
import { CropVarietyResponse } from '@core/types/crop-variety/crop-variety.response';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CropVarietyService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/crop-varieties`;

  createVariety(request: CreateCropVarietyRequest): Observable<CropVarietyResponse> {
    return this.http.post<CropVarietyResponse>(`${this.base}/create-crop-variety`, request, { withCredentials: true });
  }

  findByCrop(cropId: string, page = 0, size = 10): Observable<Page<CropVarietyResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<CropVarietyResponse>>(`${this.base}/find-by-crop/${cropId}`, { params, withCredentials: true });
  }

  searchByName(cropVarietyId: string, name: string, page = 0, size = 10): Observable<Page<CropVarietyResponse>> {
    const params = new HttpParams().set('name', name).set('page', page).set('size', size);
    return this.http.get<Page<CropVarietyResponse>>(`${this.base}/search-crop-variety/${cropVarietyId}/search`, { params, withCredentials: true });
  }

  updateVariety(id: string, request: UpdateCropVarietyRequest): Observable<CropVarietyResponse> {
    return this.http.put<CropVarietyResponse>(`${this.base}/update-crop-variety/${id}`, request, { withCredentials: true });
  }

  uploadPhoto(id: string, file: File): Observable<void> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<void>(`${this.base}/upload-photo/${id}`, form, { withCredentials: true });
  }
}