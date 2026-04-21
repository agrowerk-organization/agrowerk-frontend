import { UnitOfMeasureKey } from '@core/enums/unit-of-measure';
import { ToxicologicalClassKey } from '@core/enums/toxicological-class';

export interface InputResponse {
    id: string; // UUID
    name: string;
    internalCode: string;
    manufacturerCode: string;
    description: string;
    unitOfMeasure: UnitOfMeasureKey;
    activeIngredient: string;
    formulation: string;
    concentration: string;
    mapaRegistration: string;
    toxicologicalClass: ToxicologicalClassKey;
    gracePeriod: number;
    minimumStock: number;
    maximumStock: number;
    averagePurchasePrice: number;
    lastPurchasePrice: number;
    active: boolean;
    controlled: boolean;
    globalVisible: boolean;
    categoryId: string;
    categoryName: string;
    supplierId: string;
    supplierName: string;
    createdAt: string; 
    updatedAt: string; 
}