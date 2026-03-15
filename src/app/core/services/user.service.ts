import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment_development } from "../../../environment/environment.dev";
import { Observable } from "rxjs";
import { RegisterUserRequest } from "../types/user/register-user.request";
import { UserResponse } from "../types/user/user.response";
import { AddAddressRequest } from "../types/address/add-address.request";
import { UpdateAddressRequest } from "../types/address/update-address.request";
import { UpdateUserRequest } from "../types/user/update-user.request";
import { AddressResponse } from "../types/address/address.response";
import { UserInfo } from "../types/user/user.info";
import { Page } from "../types/page/page";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private readonly apiUrl = environment_development.apiUrl;
    private http = inject(HttpClient);
  
    register(request: RegisterUserRequest): Observable<UserResponse> {
      return this.http.post<UserResponse>(
        `${this.apiUrl}/users/register`,
        request
      );
    }
  
    getMe(): Observable<UserResponse> {
      return this.http.get<UserResponse>(
        `${this.apiUrl}/users/get/me`,
        { withCredentials: true }
      );
    }
  
    getUserById(id: string): Observable<UserResponse> {
      return this.http.get<UserResponse>(
        `${this.apiUrl}/users/get-user-by-id/${id}`,
        { withCredentials: true }
      );
    }
  
    updateUser(request: UpdateUserRequest): Observable<UserResponse> {
      return this.http.put<UserResponse>(
        `${this.apiUrl}/users/update/me`,
        request,
        { withCredentials: true }
      );
    }
  
    deleteUser(): Observable<void> {
      return this.http.delete<void>(
        `${this.apiUrl}/users/delete/me`,
        { withCredentials: true }
      );
    }
  
    searchProducers(query: string, page = 0, size = 10): Observable<Page<UserInfo>> {
      return this.http.get<Page<UserInfo>>(
        `${this.apiUrl}/users/search/producers`,
        {
          params: { query, page, size },
          withCredentials: true
        }
      );
    }
  
    addAddress(userId: string, request: AddAddressRequest): Observable<AddressResponse> {
      return this.http.post<AddressResponse>(
        `${this.apiUrl}/users/add-address/me/address/${userId}`,
        request,
        { withCredentials: true }
      );
    }
  
    updateAddress(userId: string, request: UpdateAddressRequest): Observable<AddressResponse> {
      return this.http.patch<AddressResponse>(
        `${this.apiUrl}/users/update-address/me/address/${userId}`,
        request,
        { withCredentials: true }
      );
    }
  }