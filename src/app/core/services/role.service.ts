import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { RoleResponse } from "../types/role/role.response";
@Injectable({
    providedIn: "root",
})
export class RoleService {
    private readonly base = `${environment.apiUrl}/roles`
    private http = inject(HttpClient);

    listRoles(): Observable<RoleResponse[]> {
        return this.http.get<RoleResponse[]>(
            `${this.base}/list-roles`
        );
    }

}