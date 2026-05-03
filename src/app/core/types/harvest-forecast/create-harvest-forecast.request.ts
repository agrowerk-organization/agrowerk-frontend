export interface CreateHarvestForecastRequest {
    plantingId: string;
    estimatedQuantity: number;
    forecastDate: string;
    confidenceLevel: string;
    plantedArea?: number;
    notes?: string;
}