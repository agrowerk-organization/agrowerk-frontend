import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";

export interface CreatePrescriptionItemRequest {
    inputId: string;
    authorizedQuantity: number;
    unitOfMeasure: UnitOfMeasureKey;
    usageInstructions?: string;
}