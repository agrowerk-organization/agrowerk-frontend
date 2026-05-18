export interface HttpErrorBody {
    message?: string;
    validationErrors?: Record<string, string[]>;
    errors?: string[];
}