import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";

export interface CreatePlantingInputRequest {
    plantingId: string;
    inputId: string;
    unitOfMeasure: UnitOfMeasureKey;
    quantity: number;
    applicationDate: string;
}