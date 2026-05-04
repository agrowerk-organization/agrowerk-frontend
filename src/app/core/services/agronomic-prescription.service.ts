import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePrescriptionRequest } from '@core/types/prescription/create-prescription.request';
import { PrescriptionResponse } from '@core/types/prescription/prescription.response';
import { environment }               from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AgronomicPrescriptionService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/agronomic-prescriptions`;

  createPrescription(request: CreatePrescriptionRequest, document: File): Observable<PrescriptionResponse> {
    const form = new FormData();
    form.append('data', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    form.append('document', document);
    return this.http.post<PrescriptionResponse>(`${this.base}/create-prescription`, form, { withCredentials: true });
  }

  deactivate(prescriptionId: string): Observable<PrescriptionResponse> {
    return this.http.patch<PrescriptionResponse>(
      `${this.base}/deactivate-prescription/${prescriptionId}`, {}, { withCredentials: true }
    );
  }

  findByPlanting(plantingId: string): Observable<PrescriptionResponse[]> {
    return this.http.get<PrescriptionResponse[]>(
      `${this.base}/find-by-planting/${plantingId}`, { withCredentials: true }
    );
  }

  findNearExpiration(propertyId: string): Observable<PrescriptionResponse[]> {
    return this.http.get<PrescriptionResponse[]>(
      `${this.base}/find-near-expiration/${propertyId}`, { withCredentials: true }
    );
  }
}