export interface AddAddressRequest {
    rural: boolean;       
    code: string;          
    municipality: string; 
    locationName?: string; 
    street?: string;
    number?: number;
    neighborhood?: string;
    landmark?: string;    
}