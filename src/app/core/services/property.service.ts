import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment_development } from '../../../environment/environment.dev';
import { Page } from '../types/page/page';
import { PropertyResponse } from '../types/property/property.response';
import { CreatePropertyRequest } from '../types/property/create-property.request';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private readonly apiUrl = environment_development.apiUrl;
  private http = inject(HttpClient);

  create(request: CreatePropertyRequest): Observable<PropertyResponse> {
    return this.http.post<PropertyResponse>(
      `${this.apiUrl}/properties/create`,
      request,
      { withCredentials: true }
    );
  }

  findPropertyById(id: string): Observable<PropertyResponse> {
    return this.http.get<PropertyResponse>(
      `${this.apiUrl}/properties/find-by-id/${id}`,
      { withCredentials: true }
    );
  }
  
  findMyProperties(page = 0, size = 10): Observable<Page<PropertyResponse>> {
    return this.http.get<Page<PropertyResponse>>(
      `${this.apiUrl}/properties/my-properties`,
      { params: { page, size }, withCredentials: true }
    );
  }

  update(propertyId: string, request: Partial<CreatePropertyRequest>): Observable<PropertyResponse> {
    return this.http.put<PropertyResponse>(
      `${this.apiUrl}/properties/update-property/${propertyId}`,
      request,
      { withCredentials: true }
    );
  }

  uploadPhoto(propertyId: string, file: File): Observable<void> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<void>(
      `${this.apiUrl}/properties/upload-photo/${propertyId}`,
      form,
      { withCredentials: true }
    );
  }

  addOwner(propertyId: string, request: { userId: string; canEdit: boolean }): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/properties/add-owner/${propertyId}`,
      request,
      { withCredentials: true }
    );
  }

  removeOwner(propertyId: string, targetUserId: string, reason: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/properties/remove-owner/${propertyId}/${targetUserId}`,
      { params: { reason }, withCredentials: true }
    );
  }

  updatePermissions(propertyId: string, targetUserId: string, canEdit: boolean): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/properties/update-permissions/${propertyId}/${targetUserId}`,
      null,
      { params: { canEdit }, withCredentials: true }
    );
  }
}