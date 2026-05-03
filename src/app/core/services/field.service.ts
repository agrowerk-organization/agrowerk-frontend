import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateFieldRequest } from '@core/types/field/create-field.request';
import { UpdateFieldRequest } from '@core/types/field/update-field.request';
import { FieldResponse }      from '@core/types/field/field.response';
import { PageRequest }        from '@core/types/page/page-request';
import { Page }               from '@core/types/page/page';
import { environment }        from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class FieldService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/fields`;

  createField(request: CreateFieldRequest): Observable<FieldResponse> {
    return this.http.post<FieldResponse>(`${this.base}/create-field`, request, { withCredentials: true });
  }

  updateField(fieldId: string, request: UpdateFieldRequest): Observable<FieldResponse> {
    return this.http.put<FieldResponse>(`${this.base}/update-field/${fieldId}`, request, { withCredentials: true });
  }

  findByProperty(propertyId: string, pageable?: Partial<PageRequest>): Observable<Page<FieldResponse>> {
    const params = this.buildPageParams(pageable);
    return this.http.get<Page<FieldResponse>>(`${this.base}/find-by-property/${propertyId}`, { params, withCredentials: true });
  }

  findById(fieldId: string): Observable<FieldResponse> {
    return this.http.get<FieldResponse>(`${this.base}/find-by-id/${fieldId}`, { withCredentials: true });
  }

  private buildPageParams(pageable?: Partial<PageRequest>): HttpParams {
    let params = new HttpParams();
    if (!pageable) return params;
    if (pageable.page !== undefined) params = params.set('page', pageable.page.toString());
    if (pageable.size !== undefined) params = params.set('size', pageable.size.toString());
    if (pageable.sort?.length)       pageable.sort.forEach(s => params = params.append('sort', s));
    return params;
  }
}