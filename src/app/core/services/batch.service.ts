import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Page } from '@core/types/page/page';
import { CreateBatchRequest } from '@core/types/batch/create-batch.request';
import { ReceiveBatchRequest } from '@core/types/batch/receive-batch.request';
import { BatchResponse } from '@core/types/batch/batch.response';


@Injectable({
  providedIn: 'root'
})
export class BatchService {

  private readonly base = `${environment.apiUrl}/batches`;

  private http = inject(HttpClient);

  createBatch(request: CreateBatchRequest): Observable<BatchResponse> {
    return this.http.post<BatchResponse>(
      `${this.base}/create-batch`, 
      request, 
      { withCredentials: true }
    );
  }

  receiveBatch(batchId: string, request: ReceiveBatchRequest): Observable<BatchResponse> {
    return this.http.patch<BatchResponse>(
      `${this.base}/receive-batch/${batchId}`, 
      request, 
      { withCredentials: true }
    );
  }

  cancelBatch(batchId: string): Observable<BatchResponse> {
    return this.http.patch<BatchResponse>(
      `${this.base}/cancel-batch/${batchId}`, 
      {}, 
      { withCredentials: true }
    );
  }

  findBySupplier(supplierId: string, page = 0, size = 10): Observable<Page<BatchResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BatchResponse>>(
      `${this.base}/find-bysupplier/${supplierId}`, 
      { ...{ withCredentials: true }, params }
    );
  }

  findMyAvailableBatches(): Observable<Page<BatchResponse>> {
    return this.http.get<Page<BatchResponse>>(
      `${this.base}/find-my-available`,
      { withCredentials: true }
    );
  }

  findByInput(inputId: string, page = 0, size = 10): Observable<Page<BatchResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BatchResponse>>(
      `${this.base}/find-by-input/${inputId}`, 
      { ...{ withCredentials: true }, params }
    );
  }

  findByProperty(propertyId: string, page = 0, size = 10): Observable<Page<BatchResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BatchResponse>>(
      `${this.base}/find-by-property/${propertyId}`, 
      { ...{ withCredentials: true }, params }
    );
  }

  findNearExpiration(propertyId: string, daysAlert = 15, page = 0, size = 10): Observable<Page<BatchResponse>> {
    const params = new HttpParams()
      .set('daysAlert', daysAlert.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BatchResponse>>(
      `${this.base}/find-near-expiration/${propertyId}/near-expiration`, 
      { ...{ withCredentials: true }, params }
    );
  }

  findExpired(propertyId: string, page = 0, size = 10): Observable<Page<BatchResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BatchResponse>>(
      `${this.base}/find-expired/${propertyId}`, 
      { ...{ withCredentials: true }, params }
    );
  }
}