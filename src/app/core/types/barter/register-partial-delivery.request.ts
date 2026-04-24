export interface RegisterPartialDeliveryRequest {
    commitmentId: string;
    deliveredQuantity: number;
    deliveryDate: string;
    moisturePercentage?: number;
    impurityPercentage?: number;
    qualityGrade?: string;
    notes?: string;
}