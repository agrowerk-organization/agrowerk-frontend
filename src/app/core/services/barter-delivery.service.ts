import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { RegisterPartialDeliveryRequest } from '@core/types/barter/register-partial-delivery.request';
import { PartialDeliveryResponse } from '@core/types/barter/partial-delivery.response';
import { CropCommitmentResponse } from '@core/types/barter/crop-commitment.response';

@Injectable({ providedIn: 'root' })
export class BarterDeliveryService {
  private readonly base = `${environment.apiUrl}/barter`;

  private http = inject(HttpClient);

  listMyCommitments(): Observable<CropCommitmentResponse[]> {
    return this.http.get<CropCommitmentResponse[]>(`${this.base}/find-my-commitments`, {
      withCredentials: true
    });
  }

  listByTransaction(transactionId: string): Observable<CropCommitmentResponse[]> {
    return this.http.get<CropCommitmentResponse[]>(`${this.base}/list-by-transactions/${transactionId}`, {
      withCredentials: true
    });
  }

  registerDelivery(request: RegisterPartialDeliveryRequest): Observable<PartialDeliveryResponse> {
    return this.http.post<PartialDeliveryResponse>(`${this.base}/register-delivery`, request, {
      withCredentials: true
    });
  }

  listDeliveries(commitmentId: string): Observable<PartialDeliveryResponse[]> {
    return this.http.get<PartialDeliveryResponse[]>(`${this.base}/list-deliveries/${commitmentId}`, {
      withCredentials: true
    });
  }
}