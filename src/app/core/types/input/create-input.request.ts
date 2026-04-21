import { ToxicologicalClassKey } from '@core/enums/toxicological-class';
import { UnitOfMeasureKey } from '@core/enums/unit-of-measure';

export interface CreateInputRequest {
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
    categoryId: string;
    controlled: boolean;
}