import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";
import { HazardLevel } from "@core/enums/hazard-level";

export interface UpdateInputCategoryRequest {
    name: string;
    description: string;
    unitOfMeasure: UnitOfMeasureKey;
    icon: string;
    color: string;
    hazardLevel: keyof typeof HazardLevel;
}