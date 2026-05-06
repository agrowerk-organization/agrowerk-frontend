import { PracticeType } from "@core/enums/agricultural-practice-type";
import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";

export interface CreateAgriculturalPracticeRequest {
    plantingId: string;
    practiceType: PracticeType;
    applicationDate: string;
    productUsed?: string;
    quantityUsed? : number;
    unitOfMeasure?: UnitOfMeasureKey;
    costAmount?: number;
    observations?: string;
}