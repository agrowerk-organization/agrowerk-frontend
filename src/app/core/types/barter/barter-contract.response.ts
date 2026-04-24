import { ContractStatus } from "@core/enums/contract-status";

export interface BarterContractResponse {
    id: string;
    transactionId: string;
    contractNumber: string;
    startDate: string;
    endDate: string;
    contractStatus: ContractStatus;
    termsAndConditions?: string;
    offerorSigned: boolean;
    offerorSignedAt?: string;
    acceptorSigned: boolean;
    acceptorSignedAt?: string;
    createdAt: string;
}
   