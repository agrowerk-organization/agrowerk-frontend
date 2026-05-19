import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateWarehouseRequest } from '@core/types/warehouse/create-warehouse.request';
import { UpdateWarehouseRequest } from '@core/types/warehouse/update-warehouse.request';
import { WarehouseResponse } from '@core/types/warehouse/warehouse.response';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/warehouses`;

  createWarehouse(request: CreateWarehouseRequest): Observable<WarehouseResponse> {
    return this.http.post<WarehouseResponse>(`${this.base}/create-warehouse`, request, { withCredentials: true });
  }

  updateWarehouse(warehouseId: string, request: UpdateWarehouseRequest): Observable<WarehouseResponse> {
    return this.http.patch<WarehouseResponse>(`${this.base}/update-warehouse/${warehouseId}`, request, { withCredentials: true });
  }

  deactivateWarehouse(warehouseId: string): Observable<void> {
    return this.http.patch<void>(`${this.base}/deactivate-warehouse/${warehouseId}`, {}, { withCredentials: true });
  }

  findByProperty(propertyId: string): Observable<WarehouseResponse[]> {
    return this.http.get<WarehouseResponse[]>(`${this.base}/find-by-property/${propertyId}`, { withCredentials: true });
  }

  findById(warehouseId: string): Observable<WarehouseResponse> {
    return this.http.get<WarehouseResponse>(`${this.base}/find-by-id/${warehouseId}`, { withCredentials: true });
  }
}

