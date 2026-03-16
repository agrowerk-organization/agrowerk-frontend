export interface WeatherCurrent {
    id: string;
    locationId: string;
    locationName: string;
    timestamp: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    windGusts: number;
    clouds: number;
    visibility: number;
    uvIndex: number;
    rainfall: number;
    snowfall: number;
    weatherCondition: string;
    weatherDescription: string;
    weatherCode: number;
    weatherIcon: string;
    source: string;
    fromCache: boolean;
    fetchedAt: string;
}