import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { Page } from "@core/types/page/page";
import { CreateSupplierRequest } from "@core/types/supplier/create-supplier.request";
import { UpdateSupplierRequest } from "@core/types/supplier/update-supplier.request";
import { SupplierResponse } from "@core/types/supplier/supplier.response";
@Injectable({providedIn: 'root'})
export class SupplierService {
    private readonly http = inject(HttpClient);
    private readonly base = `${environment.apiUrl}/suppliers`

    createSupplier(request: CreateSupplierRequest): Observable<SupplierResponse> {
        return this.http.post<SupplierResponse>(`${this.base}/create-supplier`, request,
            { withCredentials: true }
        );
    } 

    getMySupplier(): Observable<SupplierResponse> {
        return this.http.get<SupplierResponse>(`${this.base}/get-me`, 
            { withCredentials: true }
        );
      }
    
      findById(supplierId: string): Observable<SupplierResponse> {
        return this.http.get<SupplierResponse>(`${this.base}/find-by-id/${supplierId}`,
            { withCredentials: true }
        );
      }
    
      findByCnpj(cnpj: string): Observable<SupplierResponse> {
        return this.http.get<SupplierResponse>(`${this.base}/find-by-cnpj/${cnpj}`,
            { withCredentials: true }
        );
      }
    
      listAll(page = 0, size = 10): Observable<Page<SupplierResponse>> {
        const params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<Page<SupplierResponse>>(`${this.base}/list-all`, { 
            params : params,
            withCredentials: true 
        });
      }
    
      listByState(state: string, page = 0, size = 10): Observable<Page<SupplierResponse>> {
        const params = new HttpParams().set('state', state).set('page', page).set('size', size);
        return this.http.get<Page<SupplierResponse>>(`${this.base}/list-by-state`, {
            params : params,
            withCredentials: true
        });
      }
    
      updateSupplier(request: UpdateSupplierRequest): Observable<SupplierResponse> {
        return this.http.put<SupplierResponse>(`${this.base}/update-me`, request,
            { withCredentials: true }
        );
      }
}