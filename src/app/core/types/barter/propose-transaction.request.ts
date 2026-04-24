import { OfferType } from "@core/enums/offer-type";

export interface ProposeTransactionRequest {
    offerId: string;
    offerorGives: OfferType;
    offerorCropId?: string;
    offerorCropQuantity?: number;
    offerorAssetId?: string;
    offerorAssetQuantity?: number;
    offerorDeliveryDate: string;
    acceptorDeliveryDate: string;
    notes?: string;
}