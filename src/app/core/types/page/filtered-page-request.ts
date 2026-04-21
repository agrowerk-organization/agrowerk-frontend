import { PageRequest } from "./page-request";

export interface FilteredPageResponse<T> extends PageRequest {
    content: T[]; 
    totalElements?: number; 
}