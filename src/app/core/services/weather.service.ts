import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment_development } from "../../../environment/environment.dev";
import { WeatherDashboard } from "../types/weather/weather-dashboard";
import { WeatherForecast } from "../types/weather/weather-forecast";
import { WeatherAlert } from "../types/weather/weather-alert";
import { WeatherCurrent } from "../types/weather/weather-current";
import { WeatherLocation } from "../types/weather/weather-location";
@Injectable({
    providedIn: 'root'
  })
  export class WeatherService {
    private readonly apiUrl = environment_development.apiUrl;
    private http = inject(HttpClient);
  
    getDashboard(locationId: string): Observable<WeatherDashboard> {
      return this.http.get<WeatherDashboard>(
        `${this.apiUrl}/weather/dashboard/${locationId}`,
        { withCredentials: true }
      );
    }
  
    getCurrent(locationId: string): Observable<WeatherCurrent> {
      return this.http.get<WeatherCurrent>(
        `${this.apiUrl}/weather/current/${locationId}`,
        { withCredentials: true }
      );
    }
  
    // 
    getForecast(locationId: string, days = 7): Observable<WeatherForecast[]> {
      return this.http.get<WeatherForecast[]>(
        `${this.apiUrl}/weather/forecast/${locationId}`,
        {
          params: { days },
          withCredentials: true
        }
      );
    }
  
    getAlerts(locationId: string): Observable<WeatherAlert[]> {
      return this.http.get<WeatherAlert[]>(
        `${this.apiUrl}/weather/alerts/${locationId}`,
        { withCredentials: true }
      );
    }
  
    getLocationByProperty(propertyId: string): Observable<WeatherLocation> {
      return this.http.get<WeatherLocation>(
        `${this.apiUrl}/weather/locations/property/${propertyId}`,
        { withCredentials: true }
      );
    }
}