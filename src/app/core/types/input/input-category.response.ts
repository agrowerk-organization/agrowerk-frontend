import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";

export interface InputCategoryResponse {
    id: string;
    name: string;
    description: string;
    unitOfMeasure: UnitOfMeasureKey | null; 
    icon: string;
    color: string; 
    hazardLevel: string; 
    level: number; 
    isActive: boolean;
    requiresLicense: boolean;
    parentId: string | null;
    children?: InputCategoryResponse[]; 
    createdAt: string;
    updatedAt: string;
}