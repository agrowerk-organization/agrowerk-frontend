import { HttpErrorBody } from "./http-error-body";

export interface HttpErrorResponse {
    error?: HttpErrorBody;
    status?: number;
}