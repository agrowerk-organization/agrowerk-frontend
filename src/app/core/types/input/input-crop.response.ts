export interface InputCropResponse {
    id: string;
    inputId: string;
    inputName: string;
    inputCategory: string;
    cropId: string;
    cropName: string;
    usageRecommendation: string;
    recommendedDosePerHectare: number;
    doseUnit: string;
    approvedByAdmin: boolean;
    approvedById: string | null;
    approvedByName: string | null;
    approvedAt: string | null;
    createdAt: string;
}