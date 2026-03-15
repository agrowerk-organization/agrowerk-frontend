export interface UpdateAddressRequest {
    rural?: boolean;
    code?: string;
    municipality?: string;
    locationName?: string;
    number?: number;
    street?: string;
    neighborhood?: string;
    landmark?: string;
}