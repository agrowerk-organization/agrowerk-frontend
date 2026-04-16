import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { WeatherLocationCreateRequest } from "@core/types/weather/weather-location-create.request";
@Injectable({
    providedIn: "root",
})
export class WeatherLocationService {
    private readonly base = `${environment.apiUrl}/weather-locations`;  
    private http = inject(HttpClient);

    createLocation(request: WeatherLocationCreateRequest): Observable<void> {
        return this.http.post<void>(
            `${this.base}/create-location`,
            request,
            { withCredentials: true }
        );
    }

}