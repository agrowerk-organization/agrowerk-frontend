export interface InventoryAssetResponse {
    id: string;
    name: string;
    description: string;
    category: string;
    condition: string;
    quantity: number;
    referenceValue: number;
    unit: string;
    available: boolean;
    approvedForBarter: boolean;
    approvedById: string;
    approvedByName: string;
    approvedAt: string;
    approvalNotes: string;
    valuationMethod: string;
    agreedValue: number;
    commodityReference: string;
    commodityQuantityEquivalent: number;
    ownerId: string;
    ownerName: string;
    propertyId: string; 
    propertyName: string;
    photoUrls: string[];
    createdAt: string;
    updatedAt: string;
}