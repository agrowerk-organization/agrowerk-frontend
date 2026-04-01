import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment_development } from "@environments/environment.dev";
import { CachedPage } from "@core/types/page/cached-page";
import { FaqResponse } from "@core/types/faq/faq-response";
import { FaqCategory } from "@core/types/faq/faq-category";
import { FaqRequest } from "@core/types/faq/faq-request";
@Injectable({ providedIn: 'root' })
export class FaqService {
    private readonly apiUrl = environment_development.apiUrl;
    private http = inject(HttpClient);


    list(category?: FaqCategory, page = 0, size = 10): Observable<CachedPage<FaqResponse[]>> {
        const params: Record<string, string | number> = { page, size };
        
        if (category) {
            params['category'] = category;
        }

        return this.http.get<CachedPage<FaqResponse[]>>(
            `${this.apiUrl}/faqs/list-active`, { params } 
        );
    }

    getOne(id: string): Observable<FaqResponse> {
        return this.http.get<FaqResponse>(
            `${this.apiUrl}/faqs/get-one/${id}`
        );
    }


    create(request: FaqRequest): Observable<FaqResponse> {
        return this.http.post<FaqResponse>(
            `${this.apiUrl}/faqs/create-faq`,
            request,
            { withCredentials: true }
        );
    }

    update(id: string, request: FaqRequest): Observable<FaqResponse> {
        return this.http.put<FaqResponse>(
            `${this.apiUrl}/faqs/update-faq/${id}`,
            request,
            { withCredentials: true }
        );
    }

    deactivate(id: string): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/faqs/deactivate-faq/${id}`,
            { withCredentials: true }
        );
    }

}