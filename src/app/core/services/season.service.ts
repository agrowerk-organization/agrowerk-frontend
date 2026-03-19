import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment_development } from "../../../environment/environment.dev";
import { Observable } from "rxjs";
import { Page } from "../types/page/page";
import { SeasonResponse } from "../types/season/season-response";
@Injectable({ providedIn: 'root'})
export class SeasonService {
    private readonly apiUrl = environment_development.apiUrl
    private http = inject(HttpClient);

    findMySeasons(propertyId: string): Observable<Page<SeasonResponse[]>> {
        return this.http.get<Page<SeasonResponse[]>>(
            `${this.apiUrl}/seasons/my-season/${propertyId}`,
            { withCredentials: true }
        )
    }
}