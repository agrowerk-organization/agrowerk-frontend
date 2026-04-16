import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '@environments/environment';
import { LawResponse } from "../types/law/law";

@Injectable({
    providedIn: 'root'
})
export class LawService {
    private readonly base = `${environment.apiUrl}/laws`;
    private http = inject(HttpClient);

    getLawContent(slug: string) {
        return this.http.get<LawResponse>(`${this.base}/${slug}`);
    }
}