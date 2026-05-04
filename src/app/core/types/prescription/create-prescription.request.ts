import { CreatePrescriptionItemRequest } from "./create-prescription-item.request";

export interface CreatePrescriptionRequest {
    plantingId: string;
    agronomistName: string;
    agronomistCrea: string;
    issuedAt: string;
    validUntil: string;
    items: CreatePrescriptionItemRequest[];
}