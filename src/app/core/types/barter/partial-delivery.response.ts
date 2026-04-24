export interface PartialDeliveryResponse {
    id: string;
    commitmentId: string;
    deliveredQuantity: number;
    deliveryDate: string;
    moisturePercentage?: number;
    impurityPercentage?: number;
    qualityGrade?: string;
    notes?: string;
}  