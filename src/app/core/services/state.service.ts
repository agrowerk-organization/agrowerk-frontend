import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { StateResponse } from "@core/types/state/state.response";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private readonly base = `${environment.apiUrl}/states`;

    private http = inject(HttpClient);

    listAll(): Observable<StateResponse[]> {
        return this.http.get<StateResponse[]>(`${this.base}/find-all-states`);
    }

    findStateById(id: string): Observable<StateResponse> {
        return this.http.get<StateResponse>(`${this.base}/find-state/${id}`);
    }

    searchState(term: string): Observable<StateResponse[]> {
        return this.http.get<StateResponse[]>(`${this.base}/search-state/${term}`);
    }
}