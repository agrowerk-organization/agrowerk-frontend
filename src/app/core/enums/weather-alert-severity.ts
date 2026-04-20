export enum WeatherAlertSeverity {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
  }
  
  export interface SeverityMetadata {
    displayName: string;
    level: number;
    colorHex: string;
  }
  
  export const WEATHER_SEVERITY_DETAILS: Record<WeatherAlertSeverity, SeverityMetadata> = {
    [WeatherAlertSeverity.LOW]: { 
      displayName: 'Baixo', 
      level: 1, 
      colorHex: '#4CAF50' 
    },
    [WeatherAlertSeverity.MEDIUM]: { 
      displayName: 'Médio', 
      level: 2, 
      colorHex: '#FF9800' 
    },
    [WeatherAlertSeverity.HIGH]: { 
      displayName: 'Alto', 
      level: 3, 
      colorHex: '#FF5722' 
    },
    [WeatherAlertSeverity.CRITICAL]: { 
      displayName: 'Crítico', 
      level: 4, 
      colorHex: '#D32F2F' 
    }
};