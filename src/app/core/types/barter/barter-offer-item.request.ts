import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";

export interface BarterOfferItemRequest {
    inputId: string;
    quantity: number;
    unitOfMeasure: UnitOfMeasureKey;
    unitPriceBrl: number;
    notes?: string;
}