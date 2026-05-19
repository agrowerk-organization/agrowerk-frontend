import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateInputRequest } from "@core/types/input/create-input.request";
import { UpdateInputRequest } from "@core/types/input/update-input-request";
import { InputResponse } from "@core/types/input/input.response";
import { PageRequest } from "@core/types/page/page-request";
import { Page } from "@core/types/page/page";
import { environment } from "@environments/environment";

@Injectable({ providedIn: 'root' })
export class InputService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/inputs`;

  createInput(request: CreateInputRequest): Observable<InputResponse> {
    return this.http.post<InputResponse>(`${this.base}/create-input`, request, { withCredentials: true });
  }

  updateInput(id: string, request: UpdateInputRequest): Observable<InputResponse> {
    return this.http.patch<InputResponse>(`${this.base}/update-input/${id}`, request, { withCredentials: true });
  }

  deactivate(id: string): Observable<void> {
    return this.http.patch<void>(`${this.base}/deactivate-input/${id}`, {}, { withCredentials: true });
  }

  findCatalog(pageable?: Partial<PageRequest>): Observable<Page<InputResponse>> {
    const params = this.buildPageParams(pageable);
    return this.http.get<Page<InputResponse>>(`${this.base}/find-catalog`, { params, withCredentials: true });
  }

  findByCategory(categoryId: string, pageable?: Partial<PageRequest>): Observable<Page<InputResponse>> {
    const params = this.buildPageParams(pageable);
    return this.http.get<Page<InputResponse>>(`${this.base}/find-by-category/${categoryId}`, { params, withCredentials: true });
  }

  search(name: string, pageable?: Partial<PageRequest>): Observable<Page<InputResponse>> {
    let params = this.buildPageParams(pageable);
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<Page<InputResponse>>(`${this.base}/search`, { params, withCredentials: true });
  }

  myInputs(pageable?: Partial<PageRequest>): Observable<Page<InputResponse>> {
    const params = this.buildPageParams(pageable);
    return this.http.get<Page<InputResponse>>(`${this.base}/my-inputs`, { params, withCredentials: true });
  }

  findById(id: string): Observable<InputResponse> {
    return this.http.get<InputResponse>(`${this.base}/find-by-id/${id}`, { withCredentials: true });
  }

  private buildPageParams(pageable?: Partial<PageRequest>): HttpParams {
    let params = new HttpParams();

    if (!pageable) return params;

    if (pageable.page !== undefined) {
      params = params.set('page', pageable.page.toString());
    }
    if (pageable.size !== undefined) {
      params = params.set('size', pageable.size.toString());
    }
    if (pageable.sort && pageable.sort.length > 0) {
      pageable.sort.forEach(s => {
        params = params.append('sort', s);
      });
    }

    return params;
  }
}