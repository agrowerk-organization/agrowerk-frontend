export interface SeasonDashboardResponse {
    seasonId: string;
    seasonName: string;
    propertyId: string;
    propertyName: string;
    cropName: string;
    totalPlantings: number;
    totalArea: number;
    totalProducedKg: number;
    avgProductionKg: number;
    warning: string;
}