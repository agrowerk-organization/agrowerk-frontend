import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateInputCropRequest } from "@core/types/input/create-input-crop.request";
import { InputCropResponse } from "@core/types/input/input-crop.response";
import { environment } from "@environments/environment";

@Injectable({ providedIn: 'root' })
export class InputCropService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/input-crops`;

  suggest(request: CreateInputCropRequest): Observable<InputCropResponse> {
    return this.http.post<InputCropResponse>(`${this.base}/suggest-input-crop`, request, { withCredentials: true });
  }

  approve(id: string): Observable<InputCropResponse> {
    return this.http.patch<InputCropResponse>(`${this.base}/approve-input-crop/${id}`, {}, { withCredentials: true });
  }

  reject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/reject-input-crop/${id}`, { withCredentials: true });
  }

  findApprovedByCrop(cropId: string): Observable<InputCropResponse[]> {
    return this.http.get<InputCropResponse[]>(`${this.base}/find-approved-by-crop/${cropId}`, { withCredentials: true });
  }

  findPending(): Observable<InputCropResponse[]> {
    return this.http.get<InputCropResponse[]>(`${this.base}/find-pending`, { withCredentials: true });
  }

  findMyPending(): Observable<InputCropResponse[]> {
    return this.http.get<InputCropResponse[]>(`${this.base}/find-my-pending`, { withCredentials: true });
  }
}