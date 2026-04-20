import { WeatherAlertSeverity } from "@core/enums/weather-alert-severity";
import { WeatherAlertType } from "@core/enums/weather-alert-type";

export interface AlertStatistics {
    totalActive: number;
    totalResolved: number;
    bySeverity: Record<WeatherAlertSeverity, number>;
    byType: Record<WeatherAlertType, number>;
    lastUpdated: string;
}