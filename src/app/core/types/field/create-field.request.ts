import { FieldStatus } from "@core/enums/field-status";
import { SoilType } from "@core/enums/soil-type";

export interface CreateFieldRequest {
    propertyId: string;
    name: string;
    code?: string;
    areaHectares: number;
    description?: string;
    soilType: SoilType;
    fieldStatus: FieldStatus;
    slopePercentage?: number;
    notes?: string;
    latitude?: number;
    longitude?: number;
}