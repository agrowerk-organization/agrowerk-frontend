import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment_development } from '../../../environment/environment.dev';
import { LawResponse } from "../types/Law/law";

@Injectable({
    providedIn: 'root'
})
export class LawService {
    private readonly apiUrl = environment_development.apiUrl;  

    private http = inject(HttpClient);

    getLawContent(slug: string) {
        return this.http.get<LawResponse>(`${this.apiUrl}/laws/${slug}`);
    }
}