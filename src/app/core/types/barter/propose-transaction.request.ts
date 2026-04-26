export interface ProposeTransactionRequest {
    offerId: string;
    batchId?: string;
    offerorDeliveryDate: string;
    acceptorDeliveryDate: string;
    notes?: string;
}