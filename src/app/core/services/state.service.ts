import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment_development } from "@environments/environment.dev";
import { StateResponse } from "@core/types/state/state.response";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private readonly apiUrl = environment_development.apiUrl
    
    private http = inject(HttpClient);

    listAll(): Observable<StateResponse[]> {
        return this.http.get<StateResponse[]>(`${this.apiUrl}/states/find-all-states`);
    }

    findStateById(id: string): Observable<StateResponse> {
        return this.http.get<StateResponse>(`${this.apiUrl}/states/find-state/${id}`);
    }

    searchState(term: string): Observable<StateResponse[]> {
        return this.http.get<StateResponse[]>(`${this.apiUrl}/states/search-state/${term}`);
    }
}