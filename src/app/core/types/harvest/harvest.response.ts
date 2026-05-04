export interface HarvestResponse {
    id:                   string;
    plantingId:           string;
    cropName:             string;
    cropVarietyName:      string;
    fieldName:            string;
    propertyName:         string;
    seasonName:           string;
    harvestDate:          string;
    qualityGrade:         string;
    totalPlantingCost:    number;
    totalQuantitykg:      number;
    weightedAverageCost:  number;
    createdAt:            string;
}
  