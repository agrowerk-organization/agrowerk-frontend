import { BrazilRegion } from "@core/enums/brazil-region"

export interface UpdateCropVarietyRequest {
    name?: string
    description?: string
    region?: BrazilRegion
}