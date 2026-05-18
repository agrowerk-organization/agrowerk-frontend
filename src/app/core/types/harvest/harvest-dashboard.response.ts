export interface HarvestDashboardResponse {
    plantingId: string;
    propertyId: string;
    totalPartials: number;
    totalHarvestedKg: number;
    qualityGrade: string;   
    finalized: boolean;
    harvestDate: string;
    estimatedQuantity: number;
    commitedQuantity: number;
    confidenceLevel: string;
    varietyName: string;
    cropName: string;
    fieldName: string;
    seasonName: string;
    plantingDate: string;
    expectedHarvestDate: string;
    achievementRate: number;
    availableQuantity: number;
}