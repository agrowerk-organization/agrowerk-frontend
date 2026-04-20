export enum WeatherAlertType {
    FROST = 'FROST',
    HEAT_WAVE = 'HEAT_WAVE',
    HEAVY_RAIN = 'HEAVY_RAIN',
    DROUGHT = 'DROUGHT',
    STRONG_WINDS = 'STRONG_WINDS',
    HAIL = 'HAIL',
    STORM = 'STORM',
    EXCESSIVE_MOISTURE = 'EXCESSIVE_MOISTURE',
    WATER_STRESS = 'WATER_STRESS',
    PEST_FAVORABLE = 'PEST_FAVORABLE',
    DISEASE_FAVORABLE = 'DISEASE_FAVORABLE',
    OPTIMAL_PLANTING = 'OPTIMAL_PLANTING',
    OPTIMAL_HARVESTING = 'OPTIMAL_HARVESTING'
  }
  
  export interface WeatherAlertMetadata {
    label: string;
    description: string;
  }
  
  export const WEATHER_ALERT_DETAILS: Record<WeatherAlertType, WeatherAlertMetadata> = {
    [WeatherAlertType.FROST]: { 
      label: 'Geada', 
      description: 'Risco de formação de gelo nas plantas' 
    },
    [WeatherAlertType.HEAT_WAVE]: { 
      label: 'Onda de Calor', 
      description: 'Temperaturas extremamente altas' 
    },
    [WeatherAlertType.HEAVY_RAIN]: { 
      label: 'Chuva Intensa', 
      description: 'Alto volume de precipitação em curto período' 
    },
    [WeatherAlertType.DROUGHT]: { 
      label: 'Seca', 
      description: 'Baixa precipitação por período prolongado' 
    },
    [WeatherAlertType.STRONG_WINDS]: { 
      label: 'Ventos Fortes', 
      description: 'Velocidade do vento acima do normal' 
    },
    [WeatherAlertType.HAIL]: { 
      label: 'Granizo', 
      description: 'Risco de queda de granizo' 
    },
    [WeatherAlertType.STORM]: { 
      label: 'Tempestade', 
      description: 'Tempestade elétrica ou severa' 
    },
    [WeatherAlertType.EXCESSIVE_MOISTURE]: { 
      label: 'Umidade Excessiva', 
      description: 'Umidade do solo muito alta' 
    },
    [WeatherAlertType.WATER_STRESS]: { 
      label: 'Stress Hídrico', 
      description: 'Falta de água para as culturas' 
    },
    [WeatherAlertType.PEST_FAVORABLE]: { 
      label: 'Condições Favoráveis a Pragas', 
      description: 'Clima propício para proliferação de pragas' 
    },
    [WeatherAlertType.DISEASE_FAVORABLE]: { 
      label: 'Condições Favoráveis a Doenças', 
      description: 'Clima propício para doenças fúngicas' 
    },
    [WeatherAlertType.OPTIMAL_PLANTING]: { 
      label: 'Condições Ideais para Plantio', 
      description: 'Clima favorável para início de plantio' 
    },
    [WeatherAlertType.OPTIMAL_HARVESTING]: { 
      label: 'Condições Ideais para Colheita', 
      description: 'Clima favorável para colheita' 
    }
};