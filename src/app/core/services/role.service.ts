import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment_development } from "../../../environment/environment.dev";
import { RoleResponse } from "../types/role/role.response";
@Injectable({
    providedIn: "root",
})
export class RoleService {
    private readonly apiUrl = environment_development.apiUrl;
    private http = inject(HttpClient);

    listRoles(): Observable<RoleResponse[]> {
        return this.http.get<RoleResponse[]>(
            `${this.apiUrl}/roles/list-roles`
        );
    }

}