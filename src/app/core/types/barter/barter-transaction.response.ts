import { OfferType } from "@core/enums/offer-type";
import { TransactionStatus } from "@core/enums/transaction-status";
import { ContractSignatureStatus } from "./contract-signature-status";
import { AddressResponse } from "../address/address.response";

export interface BarterTransactionResponse {
    id: string;
    offerId: string;
    offerTitle: string;
    offerorId: string;
    offerorName: string;
    acceptorId: string;
    acceptorName: string;
    offerorGives: OfferType;
    offerorCropId?: string;
    offerorCropName?: string;
    offerorCropQuantity?: number;
    offerorAssetId?: string;
    offerorAssetName?: string;
    offerorAssetQuantity?: number;
    offerorBatchNumber?: string;
    offerorInputName ?: string;
    acceptorGives: OfferType;
    acceptorCropId?: string;
    acceptorCropName?: string;
    acceptorCropQuantity?: number;
    status: TransactionStatus;
    offerorDeliveryDate: string;
    acceptorDeliveryDate: string;
    notes?: string;
    contractId?: string;
    contractSignatureStatus?: ContractSignatureStatus;
    createdAt: string;
    offerorAddress?: AddressResponse;
}