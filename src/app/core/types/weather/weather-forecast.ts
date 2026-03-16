export interface WeatherForecast {
    id: string;
    locationId: string;
    forecastDate: string;
    forecastHour: number;
    temperatureMin: number;
    temperatureMax: number;
    temperatureAvg: number;
    humidityAvg: number;
    rainfallProbability: number;
    rainfallAmount: number;
    windSpeedMax: number;
    weatherCondition: string;
    weatherDescription: string;
    weatherCode: number;
    weatherIcon: string;
    uvIndexMax: number;
    evapotranspiration: number;
    fetchedAt: string;
}