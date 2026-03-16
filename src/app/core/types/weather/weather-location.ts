export interface WeatherLocation {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    state: string;  
    country: string;
    timezone: string;
    propertyId: string; 
    propertyName: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}