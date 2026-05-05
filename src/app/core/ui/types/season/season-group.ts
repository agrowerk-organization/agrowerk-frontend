import { SeasonDashboardResponse } from "@core/types/harvest/season-dashboard.response";

export interface SeasonGroup {
    seasonId: string;
    seasonName: string;
    items: SeasonDashboardResponse[];
    totalArea: number;
    totalProduced: number;
    totalPlantings: number;
}