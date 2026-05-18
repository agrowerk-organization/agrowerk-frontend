import { SeasonDashboardResponse } from "@core/types/season/season-dashboard.response";

export interface SeasonGroup {
    seasonId: string;
    seasonName: string;
    items: SeasonDashboardResponse[];
    totalArea: number;
    totalProduced: number;
    totalPlantings: number;
}