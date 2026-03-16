import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment_development } from "../../../environment/environment.dev";
import { Observable } from "rxjs";
import { Page } from "../types/page/page";
import { PropertyResponse } from "../types/property/property.response";
@Injectable({providedIn: 'root'})
export class PropertyService {
    private readonly apiUrl = environment_development.apiUrl;
    private http = inject(HttpClient);
    findMyProperties(page = 0, size = 10): Observable<Page<PropertyResponse>> {
        return this.http.get<Page<PropertyResponse>>(
        `${this.apiUrl}/properties/my-properties`,
        {
            params: { page, size },
            withCredentials: true
        }
        );
    }
}