import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment_development } from "@environments/environment.dev";
import { WeatherLocationCreateRequest } from "@core/types/weather/weather-location-create.request";
@Injectable({
    providedIn: "root",
})
export class WeatherLocationService {

    private readonly apiUrl = environment_development.apiUrl
    private http = inject(HttpClient);

    createLocation(request: WeatherLocationCreateRequest): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/weather-locations/create-location`,
            request,
            { withCredentials: true }
        );
    }

}