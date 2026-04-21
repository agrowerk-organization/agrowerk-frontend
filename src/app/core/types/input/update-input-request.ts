import { ToxicologicalClassKey } from "@core/enums/toxicological-class";
import { UnitOfMeasureKey } from "@core/enums/unit-of-measure";

export interface UpdateInputRequest {
    name: string;
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
}