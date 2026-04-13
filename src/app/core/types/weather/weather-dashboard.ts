import { WeatherAlert } from "./weather-alert";
import { WeatherCurrent } from "./weather-current";
import { WeatherForecast } from "./weather-forecast";
import { WeatherStatistics } from "./weather-statistics";
export interface WeatherDashboard {
    locationId: string;
    locationName: string;
    latitude: number;
    longitude: number;
    current: WeatherCurrent;
    hourlyForecast: WeatherForecast[];
    dailyForecast: WeatherForecast[];
    activeAlerts: WeatherAlert[];
    statistics: WeatherStatistics;
    lastUpdate: string;
}