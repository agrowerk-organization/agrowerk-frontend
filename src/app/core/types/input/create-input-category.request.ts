import { HazardLevel } from "@core/enums/hazard-level";
import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";

export interface CreateInputCategoryRequest {
    name: string;
    description: string;
    unitOfMeasure: UnitOfMeasureKey;
    icon: string;
    color: string;
    parentId?: string;
    hazardLevel: keyof typeof HazardLevel;
}