import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { Page } from "../types/page/page";
import { SeasonResponse } from "../types/season/season-response";
@Injectable({ providedIn: 'root'})
export class SeasonService {
    private readonly base = `${environment.apiUrl}/seasons`;
    private http = inject(HttpClient);

    findMySeasons(propertyId: string): Observable<Page<SeasonResponse[]>> {
        return this.http.get<Page<SeasonResponse[]>>(
            `${this.base}/my-season/${propertyId}`,
            { withCredentials: true }
        )
    }
}