export interface BatchResponse {
    id: string; 
    batchNumber: string;
    invoiceNumber: string;
    inputId: string;
    inputName: string;
    supplierId: string;
    supplierName: string;
    propertyId: string;
    propertyName: string;
    initialQuantity: number; 
    currentQuantity: number;
    manufacturingDate: string;
    expirationDate: string;
    entryDate: string;
    unitPrice: number;
    totalValue: number;
    status: string;
    receiptStatus: string;
    receivedAt: string;
    notes: string;
    nearExpiration: boolean;
    expired: boolean;
    createdAt: string;
    updatedAt: string;
}