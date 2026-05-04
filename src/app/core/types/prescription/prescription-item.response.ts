export interface PrescriptionItemResponse {
    id: string;
    inputId: string;
    inputName: string;
    authorizedQuantity: number;
    unitOfMeasure: string;
    usageInstructions?: string
}