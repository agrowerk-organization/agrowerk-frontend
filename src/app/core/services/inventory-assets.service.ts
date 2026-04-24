import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Page } from '@core/types/page/page';
import { CreateInventoryAssetRequest } from '@core/types/inventory/create-inventory-asset.request';  
import { UpdateInventoryAssetRequest } from '@core/types/inventory/update-inventory-asset.request';
import { InventoryAssetResponse } from '@core/types/inventory/inventory-asset.response';

@Injectable({
  providedIn: 'root'
})
export class InventoryAssetService {

  private readonly base = `${environment.apiUrl}/inventory-assets`;
  private http = inject(HttpClient);

  createAsset(data: CreateInventoryAssetRequest, photos: File[]): Observable<InventoryAssetResponse> {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    photos.forEach(file => formData.append('photos', file));

    return this.http.post<InventoryAssetResponse>(`${this.base}/create-asset`, formData, { withCredentials: true });
  }

  updateAsset(assetId: string, request: UpdateInventoryAssetRequest): Observable<InventoryAssetResponse> {
    return this.http.put<InventoryAssetResponse>(`${this.base}/update-asset/${assetId}`, request, { withCredentials: true });
  }

  addPhotos(assetId: string, photos: File[]): Observable<InventoryAssetResponse> {
    const formData = new FormData();
    photos.forEach(file => formData.append('photos', file));
    
    return this.http.post<InventoryAssetResponse>(`${this.base}/${assetId}/photos`, formData, { withCredentials: true });
  }

  requestBarter(assetId: string): Observable<InventoryAssetResponse> {
    return this.http.patch<InventoryAssetResponse>(`${this.base}/${assetId}/request-barter`, {}, { withCredentials: true });
  }

  approveBarter(assetId: string, notes?: string): Observable<InventoryAssetResponse> {
    let params = new HttpParams();
    if (notes) params = params.set('notes', notes);

    return this.http.patch<InventoryAssetResponse>(`${this.base}/${assetId}/approve-barter`, null, { params, withCredentials: true });
  }

  rejectBarter(assetId: string, reason: string): Observable<void> {
    const params = new HttpParams().set('reason', reason);
    return this.http.patch<void>(`${this.base}/${assetId}/reject-barter`, null, { params, withCredentials: true });
  }

  getMyAssets(page = 0, size = 10): Observable<Page<InventoryAssetResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<InventoryAssetResponse>>(`${this.base}/my-assets`, { params, withCredentials: true });
  }

  getBarterCatalog(page = 0, size = 10): Observable<Page<InventoryAssetResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<InventoryAssetResponse>>(`${this.base}/barter-catalog`, { params, withCredentials: true });
  }

  getPendingApproval(page = 0, size = 10): Observable<Page<InventoryAssetResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<InventoryAssetResponse>>(`${this.base}/pending-approval`, { params, withCredentials: true });
  }
}