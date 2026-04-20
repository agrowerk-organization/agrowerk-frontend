import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { Alert } from "@core/types/weather/alert";
import { WeatherDashboard } from "../types/weather/weather-dashboard";
import { WeatherForecast } from "../types/weather/weather-forecast";
import { WeatherCurrent } from "../types/weather/weather-current";
import { WeatherLocation } from "../types/weather/weather-location";
@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly base = `${environment.apiUrl}/weather`;
  private readonly locationBase = `${environment.apiUrl}/weather-locations`; 
  private http = inject(HttpClient);

  getDashboard(locationId: string): Observable<WeatherDashboard> {
    return this.http.get<WeatherDashboard>(
      `${this.base}/get-dashboard/${locationId}`, 
      { withCredentials: true }
    );
  }

  getCurrent(locationId: string): Observable<WeatherCurrent> {
    return this.http.get<WeatherCurrent>(
      `${this.base}/get-current/${locationId}`,    
      { withCredentials: true }
    );
  }

  getForecast(locationId: string, days = 7): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(
      `${this.base}/get-forecast/${locationId}`,   
      { params: { days }, withCredentials: true }
    );
  }

  getAlerts(locationId: string): Observable<Alert[]> {
    return this.http.get<Alert[]>(
      `${this.base}/get-alerts/${locationId}`,    
      { withCredentials: true }
    );
  }

  getLocationByProperty(propertyId: string): Observable<WeatherLocation> {
    return this.http.get<WeatherLocation>(
      `${this.locationBase}/get-by-property/${propertyId}`, 
      { withCredentials: true }
    );
  }
}