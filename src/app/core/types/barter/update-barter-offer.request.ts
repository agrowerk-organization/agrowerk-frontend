export interface UpdateBarterOfferRequest {
    title?: string;
    description?: string;
    requestedDescription?: string;
    expiresAt?: string;
    offeredCropQuantity?: number;
    offeredAssetQuantity?: number;
}