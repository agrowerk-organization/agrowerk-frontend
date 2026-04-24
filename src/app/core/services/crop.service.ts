import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "@core/types/page/page";
import { CreateCropRequest } from "../types/crop/create-crop.request";
import { CropResponse } from "../types/crop/crop.response";
import { UpdateCropRequest } from "../types/crop/update-crop.request";
import { environment } from "@environments/environment";

@Injectable({ providedIn: 'root' })
export class CropService {
    private readonly http = inject(HttpClient);
    private readonly base = `${environment.apiUrl}/crops`;

    list(page = 0, size = 12): Observable<Page<CropResponse>> {
        const params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<Page<CropResponse>>(`${this.base}/list-crops`, { params, withCredentials: true });
    }

    listByCategory(page = 0, size = 12, category: string): Observable<Page<CropResponse>> {
        const params = new HttpParams().set('page', page).set('size', size).set('category', category);
        return this.http.get<Page<CropResponse>>(`${this.base}/list-crops`, { params, withCredentials: true });
    }
    
    search(name: string, page = 0, size = 12): Observable<Page<CropResponse>> {
        const params = new HttpParams().set('name', name).set('page', page).set('size', size);
        return this.http.get<Page<CropResponse>>(`${this.base}/search-crop`, { params, withCredentials: true });
    }
  
    findById(id: string): Observable<CropResponse> {
        return this.http.get<CropResponse>(`${this.base}/find-crop-by-id/${id}`, { withCredentials: true });
    }
  
    create(request: CreateCropRequest): Observable<CropResponse> {
        return this.http.post<CropResponse>(`${this.base}/create-crop`, request, { withCredentials: true });
    }
  
    update(id: string, request: UpdateCropRequest): Observable<CropResponse> {
        return this.http.put<CropResponse>(`${this.base}/update-crop/${id}`, request, { withCredentials: true });
    }
  
    uploadPhoto(cropId: string, file: File): Observable<void> {
        const form = new FormData();
        form.append('file', file);
        return this.http.post<void>(`${this.base}/upload-photo/${cropId}`, form, { withCredentials: true });
    }
}