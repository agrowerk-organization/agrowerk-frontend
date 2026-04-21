import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateInputCategoryRequest } from "@core/types/input/create-input-category.request";
import { UpdateInputCategoryRequest } from "@core/types/input/update-input-category.request";
import { InputCategoryResponse } from "@core/types/input/input-category.response";
import { environment } from "@environments/environment";

@Injectable({ providedIn: 'root' })
export class InputCategoryService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/input-categories`;

  createCategory(request: CreateInputCategoryRequest): Observable<InputCategoryResponse> {
    return this.http.post<InputCategoryResponse>(`${this.base}/create-input-category`, request, { withCredentials: true });
  }

  updateCategory(id: string, request: UpdateInputCategoryRequest): Observable<InputCategoryResponse> {
    return this.http.put<InputCategoryResponse>(`${this.base}/${id}/update`, request, { withCredentials: true });
  }

  deactivate(id: string): Observable<void> {
    return this.http.patch<void>(`${this.base}/deactivate/${id}`, {}, { withCredentials: true });
  }

  findTree(): Observable<InputCategoryResponse[]> {
    return this.http.get<InputCategoryResponse[]>(`${this.base}/find-tree`, { withCredentials: true });
  }

  findFlat(): Observable<InputCategoryResponse[]> {
    return this.http.get<InputCategoryResponse[]>(`${this.base}/find-flat`, { withCredentials: true });
  }

  findById(id: string): Observable<InputCategoryResponse> {
    return this.http.get<InputCategoryResponse>(`${this.base}/find-by-id/${id}`, { withCredentials: true });
  }
}