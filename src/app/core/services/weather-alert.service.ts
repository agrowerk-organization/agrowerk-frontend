import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { Alert } from "@core/types/weather/alert";
import { AlertStatistics } from "@core/types/weather/alert-statistics";

@Injectable({ providedIn: 'root' })
export class WeatherAlertService {
  private readonly base = `${environment.apiUrl}/weather-alerts`;
  private http = inject(HttpClient);

  getActive(locationId: string): Observable<Alert[]> {
    return this.http.get<Alert[]>(
      `${this.base}/get-active/${locationId}`,
      { withCredentials: true }
    );
  }

  getStatistics(locationId: string): Observable<AlertStatistics> {
    return this.http.get<AlertStatistics>(
      `${this.base}/get-statistics/${locationId}`,
      { withCredentials: true }
    );
  }

  resolve(alertId: string, observations: string | null): Observable<void> {
    return this.http.post<void>(
      `${this.base}/resolve/${alertId}`,
      { observations },
      { withCredentials: true }
    );
  }

  getPendingCount(): Observable<number> {
    return this.http.get<number>(
      `${this.base}/get-pending`,
      { withCredentials: true }
    );
  }
}