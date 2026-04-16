import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Page } from '../types/page/page';
import { PropertyResponse } from '../types/property/property.response';
import { CreatePropertyRequest } from '../types/property/create-property.request';
import { FileUploadResponse } from '@core/types/file/file-upload.response';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private readonly base = `${environment.apiUrl}/properties`;
  private http = inject(HttpClient);

  create(request: CreatePropertyRequest): Observable<PropertyResponse> {
    return this.http.post<PropertyResponse>(
      `${this.base}/create-property`,
      request,
      { withCredentials: true }
    );
  }

  findPropertyById(id: string): Observable<PropertyResponse> {
    return this.http.get<PropertyResponse>(
      `${this.base}/find-by-id/${id}`,
      { withCredentials: true }
    );
  }
  
  findMyProperties(page = 0, size = 10): Observable<Page<PropertyResponse>> {
    return this.http.get<Page<PropertyResponse>>(
      `${this.base}/my-properties`,
      { params: { page, size }, withCredentials: true }
    );
  }

  update(propertyId: string, request: Partial<CreatePropertyRequest>): Observable<PropertyResponse> {
    return this.http.put<PropertyResponse>(
      `${this.base}/update-property/${propertyId}`,
      request,
      { withCredentials: true }
    );
  }

  uploadPhoto(propertyId: string, file: File): Observable<FileUploadResponse> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<FileUploadResponse>(
      `${this.base}/upload-photo/${propertyId}`,
      form,
      { withCredentials: true }
    );
  }

  addOwner(propertyId: string, request: { userId: string; canEdit: boolean }): Observable<void> {
    return this.http.post<void>(
      `${this.base}/add-owner/${propertyId}`,
      request,
      { withCredentials: true }
    );
  }

  removeOwner(propertyId: string, targetUserId: string, reason: string): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/remove-owner/${propertyId}/${targetUserId}`,
      { params: { reason }, withCredentials: true }
    );
  }

  updatePermissions(propertyId: string, targetUserId: string, canEdit: boolean): Observable<void> {
    return this.http.patch<void>(
      `${this.base}/update-permissions/${propertyId}/${targetUserId}`,
      null,
      { params: { canEdit }, withCredentials: true }
    );
  }
}