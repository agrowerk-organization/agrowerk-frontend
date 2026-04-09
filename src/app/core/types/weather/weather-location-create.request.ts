export interface WeatherLocationCreateRequest {
    name: string;
    latitude: number;
    longitude: number;
    state: string;
    country?: string;
    timezone?: string;
    propertyId: string;
    active?: boolean;
}