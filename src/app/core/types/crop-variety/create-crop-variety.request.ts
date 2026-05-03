import { BrazilRegion } from "@core/enums/brazil-region";

export interface CreateCropVarietyRequest { 
    cropId: string;
    name: string;
    description?: string;
    region?: BrazilRegion;
}