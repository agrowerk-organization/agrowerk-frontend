
export interface CreateBatchRequest {
    batchNumber: string;
    invoiceNumber?: string;
    inputId: string;
    supplierId: string;
    initialQuantity: number;
    manufacturingDate: string;
    expirationDate: string;
    entryDate: string;
    unitPrice: number;
    notes?: string;
}