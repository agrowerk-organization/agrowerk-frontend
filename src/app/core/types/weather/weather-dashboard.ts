import { WeatherCurrent } from "./weather-current";
import { WeatherForecast } from "./weather-forecast";
import { WeatherStatistics } from "./weather-statistics";
import { Alert } from "./alert";
export interface WeatherDashboard {
    locationId: string;
    locationName: string;
    latitude: number;
    longitude: number;
    current: WeatherCurrent;
    hourlyForecast: WeatherForecast[];
    dailyForecast: WeatherForecast[];
    activeAlerts?: Alert[];
    statistics: WeatherStatistics;
    lastUpdate: string;
}