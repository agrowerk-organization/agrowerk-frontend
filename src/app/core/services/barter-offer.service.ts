import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { OfferType } from '@core/enums/offer-type';
import { Page } from '@core/types/page/page';
import { CreateBarterOfferRequest } from '@core/types/barter/create-barter-offer.request';
import { BarterOfferResponse } from '@core/types/barter/barter-offer.response';
import { UpdateBarterOfferRequest } from '@core/types/barter/update-barter-offer.request';

@Injectable({ providedIn: 'root' })
export class BarterOfferService {
  private readonly base = `${environment.apiUrl}/barter-offers`;

  private http = inject(HttpClient);

  listActive(page = 0, size = 10): Observable<Page<BarterOfferResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BarterOfferResponse>>(`${this.base}/list-active`, { 
      params,
      withCredentials: true 
    });
  }

  listByCrop(cropId: string, page = 0, size = 10): Observable<Page<BarterOfferResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BarterOfferResponse>>(`${this.base}/list-by-crop/${cropId}`, { 
      params,
      withCredentials: true 
    });
  }

  listByType(offerType: OfferType, page = 0, size = 10): Observable<Page<BarterOfferResponse>> {
    const params = new HttpParams()
      .set('offerType', offerType)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BarterOfferResponse>>(`${this.base}/list-by-type`, { 
      params,
      withCredentials: true 
    });
  }

  listMyOffers(page = 0, size = 10): Observable<Page<BarterOfferResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BarterOfferResponse>>(`${this.base}/list-my-offers`, { 
      params,
      withCredentials: true 
    });
  }

  getLatestCommodityPrice(cropName: string): Observable<{ price: number; referenceDate: string } | null> {
    return this.http.get<{ price: number; referenceDate: string } | null>(
      `${this.base}/commodity-price/latest?commodity=${cropName}` 
    );
  }

  listForSupplier(page = 0, size = 10): Observable<Page<BarterOfferResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<BarterOfferResponse>>(`${this.base}/list-for-supplier`, { 
      params,
      withCredentials: true 
    });
  }

  findById(id: string): Observable<BarterOfferResponse> {
    return this.http.get<BarterOfferResponse>(`${this.base}/find-by-id/${id}`, {
      withCredentials: true
    });
  }

  createOffer(request: CreateBarterOfferRequest): Observable<BarterOfferResponse> {
    return this.http.post<BarterOfferResponse>(`${this.base}/create-offer`, request, {
      withCredentials: true
    });
  }

  updateOffer(id: string, request: UpdateBarterOfferRequest): Observable<BarterOfferResponse> {
    return this.http.put<BarterOfferResponse>(`${this.base}/update-offer/${id}`, request, {
      withCredentials: true
    });
  }

  cancelOffer(id: string): Observable<void> {
    return this.http.patch<void>(`${this.base}/cancel/${id}`, {}, {
      withCredentials: true
    });
  }
}