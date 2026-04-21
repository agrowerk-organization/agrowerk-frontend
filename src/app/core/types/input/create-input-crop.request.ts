import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";

export interface CreateInputCropRequest {
    name: string;
    cropId: string;
    usageRecommendation: string;
    recommendedDosePerHectare: number;
    unitOfMeasure: UnitOfMeasureKey;
}