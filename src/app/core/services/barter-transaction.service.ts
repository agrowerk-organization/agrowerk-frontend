import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Page } from '@core/types/page/page';
import { BarterTransactionResponse } from '@core/types/barter/barter-transaction.response';
import { ProposeTransactionRequest } from '@core/types/barter/propose-transaction.request';
import { AcceptTransactionRequest } from '@core/types/barter/accept-transaction.request'; 
import { BarterContractResponse } from '@core/types/barter/barter-contract.response';

@Injectable({ providedIn: 'root' })
export class BarterTransactionService {
  private readonly api = `${environment.apiUrl}/barter-transactions`;

  private http = inject(HttpClient);

  propose(request: ProposeTransactionRequest): Observable<BarterTransactionResponse> {
    return this.http.post<BarterTransactionResponse>(`${this.api}/propose-transaction`, request, {
      withCredentials: true
    });
  }

  accept(transactionId: string, request: AcceptTransactionRequest): Observable<BarterTransactionResponse> {
    return this.http.patch<BarterTransactionResponse>(
      `${this.api}/accept-transaction/${transactionId}`, request, {
        withCredentials: true
      }
    );
  }

  decline(transactionId: string): Observable<void> {
    return this.http.patch<void>(`${this.api}/decline-transaction/${transactionId}`, {}, {
      withCredentials: true
    });
  }

  cancel(transactionId: string): Observable<void> {
    return this.http.patch<void>(`${this.api}/cancel-transaction/${transactionId}`, {}, {
      withCredentials: true
    });
  }

  listMine(page = 0, size = 10): Observable<Page<BarterTransactionResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BarterTransactionResponse>>(`${this.api}/list-my-transactions`, { 
      params,
      withCredentials: true 
    });
  }

  findById(id: string): Observable<BarterTransactionResponse> {
    return this.http.get<BarterTransactionResponse>(`${this.api}/find-by-id/${id}`, {
      withCredentials: true
    });
  }

  findContract(transactionId: string): Observable<BarterContractResponse> {
    return this.http.get<BarterContractResponse>(`${this.api}/contract-transaction/${transactionId}`, {
      withCredentials: true
    });
  }

  signContract(contractId: string): Observable<BarterContractResponse> {
    return this.http.post<BarterContractResponse>(`${this.api}/sign-contract`, { contractId }, {
      withCredentials: true
    });
  }
}