export interface CreatePlantingRequest {
    propertyId: string;
    fieldId: string;
    seasonId: string;
    cropVarietyId: string;
    areaHectares: number;
    plantingDate: string;
    expectedHarvestDate: string;
}