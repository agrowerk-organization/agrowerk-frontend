export interface WeatherStatistics {
    avgTemperatureLast7Days: number;
    totalRainfallLast7Days: number;
    totalRainfallLast30Days: number;
    avgHumidityLast7Days: number;
    totalAlerts: number;
    criticalAlerts: number;
    waterStressIndex: number;
    waterStressLevel: string;
    evapotranspirationTotal7d: number; 
}