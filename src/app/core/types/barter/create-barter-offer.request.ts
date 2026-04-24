import { BarterOfferItemRequest } from "./barter-offer-item.request";
import { OfferType } from "@core/enums/offer-type";

export interface CreateBarterOfferRequest {
    title: string;
    description?: string;
    propertyId: string;
    offerType: OfferType;
    harvestForecastId?: string;   
    offeredCropQuantity?: number;
    estimatedHarvestDate?: string;
    offeredAssetId?: string;
    offeredAssetQuantity?: number;
    requestedType: OfferType;
    requestedDescription?: string;
    requestedValue?: number;
    region?: string;
    requestedItems?: BarterOfferItemRequest[];
    expiresAt: string;
  }