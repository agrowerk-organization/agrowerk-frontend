export interface HarvestForecastResponse {
    id:                  string;
    plantingId:          string;
    cropName:            string;
    cropVarietyName:     string;
    fieldName:           string;
    seasonName:          string;
    propertyName:        string;
    estimatedQuantity:   number;
    committedQuantity:   number;
    availableQuantity:   number;
    forecastDate:        string;
    confidenceLevel:     string;
    plantedArea?:        number;
    notes?:              string;
    actualQuantityKg?:   number;
    forecastAccuracy?:   number;
    createdAt:           string;
    updatedAt:           string;
}