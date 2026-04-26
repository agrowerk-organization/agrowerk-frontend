import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { Page } from "@core/types/page/page";
import { FaqResponse } from "@core/types/faq/faq-response";
import { FaqCategory } from "@core/types/faq/faq-category";
import { FaqRequest } from "@core/types/faq/faq-request";

@Injectable({ providedIn: 'root' })
export class FaqService {
    private readonly base = `${environment.apiUrl}/faqs`;
    private http = inject(HttpClient);


    list(category?: FaqCategory, page = 0, size = 10): Observable<Page<FaqResponse>> {
        const params: Record<string, string | number> = { page, size };
        
        if (category) {
            params['category'] = category;
        }

        return this.http.get<Page<FaqResponse>>(
            `${this.base}/list-active`, { params } 
        );
    }

    getOne(id: string): Observable<FaqResponse> {
        return this.http.get<FaqResponse>(
            `${this.base}/get-one/${id}`
        );
    }


    create(request: FaqRequest): Observable<FaqResponse> {
        return this.http.post<FaqResponse>(
            `${this.base}/create-faq`,
            request,
            { withCredentials: true }
        );
    }

    update(id: string, request: FaqRequest): Observable<FaqResponse> {
        return this.http.put<FaqResponse>(
            `${this.base}/update-faq/${id}`,
            request,
            { withCredentials: true }
        );
    }

    deactivate(id: string): Observable<void> {
        return this.http.delete<void>(
            `${this.base}/deactivate-faq/${id}`,
            { withCredentials: true }
        );
    }

}