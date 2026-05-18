export interface BatchExpirationResponse {
    batchId: string;
    batchNumber: string;
    inputName: string;
    categoryName: string;
    supplierName: string;
    currentQuantity: number;
    expirationDate: string;
    unitPrice: number;
    currentValue: number;
    daysUntilExpiration: number;
    expirationStatus: string;
}