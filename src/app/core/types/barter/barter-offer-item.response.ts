import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";

export interface BarterOfferItemResponse {
    id: string;
    inputId: string;
    inputName: string;
    quantity: number;
    unit: UnitOfMeasureKey;
    unitPriceBrl: number;
    totalPriceBrl: number;
    notes?: string;
}