import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { Page } from "../types/page/page";
import { CreateSeasonRequest } from "../types/season/create-season.request";
import { SeasonResponse } from "../types/season/season-response";

@Injectable({ providedIn: 'root' })
export class SeasonService {
    private readonly base = `${environment.apiUrl}/seasons`;
    private http = inject(HttpClient);


    findMySeasons(propertyId: string, page = 0, size = 10): Observable<Page<SeasonResponse>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<Page<SeasonResponse>>(
            `${this.base}/my-season/${propertyId}`,
            { params, withCredentials: true }
        );
    }

    createSeason(request: CreateSeasonRequest): Observable<SeasonResponse> {
        return this.http.post<SeasonResponse>(
            `${this.base}/create-season`, 
            request, 
            { withCredentials: true }
        );
    }

    activateSeason(seasonId: string): Observable<SeasonResponse> {
        return this.http.patch<SeasonResponse>(
            `${this.base}/activate-season/${seasonId}`, 
            {}, 
            { withCredentials: true }
        );
    }

    finishSeason(seasonId: string): Observable<SeasonResponse> {
        return this.http.patch<SeasonResponse>(
            `${this.base}/finish-season/${seasonId}`, 
            {}, 
            { withCredentials: true }
        );
    }

    findActiveSeason(propertyId: string): Observable<SeasonResponse> {
        return this.http.get<SeasonResponse>(
            `${this.base}/active/${propertyId}`, 
            { withCredentials: true }
        );
    }
}