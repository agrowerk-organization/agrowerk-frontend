export interface CreateHarvestRequest {
    plantingId: string;
    harvestDate: string;
    quantityKg: number;
    qualityGrade?: string;
}