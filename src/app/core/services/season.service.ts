import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment_development } from "../../../environment/environment.dev";
import { Observable } from "rxjs";
import { SeasonResponse } from "../types/season/season-response";
@Injectable({ providedIn: 'root'})
export class SeasonService {
    private readonly apiUrl = environment_development.apiUrl
    private http = inject(HttpClient);

    findMySeasons(propertyId: string): Observable<SeasonResponse[]> {
        return this.http.get<SeasonResponse[]>(
            `${this.apiUrl}/seasons/property/${propertyId}`,
            { withCredentials: true }
        )
    }
}