import { CommitmentStatus } from "@core/enums/commitment-status";

export interface CropCommitmentResponse {
    id: string;
    transactionId: string;
    farmerId: string;
    farmerName: string;
    cropId: string;
    cropName: string;
    committedQuantity: number;
    deliveredQuantity: number;
    pendingQuantity: number;
    progressPercent: number;
    expectedDeliveryDate: string;
    actualDeliveryDate?: string;
    status: CommitmentStatus;
    notes?: string;
}