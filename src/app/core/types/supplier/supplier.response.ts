import { AddressResponse } from "../address/address.response";

export interface SupplierResponse {
    id: string;
    corporateReason: string;
    fantasyName: string;
    cnpj: string;
    stateRegistration: string;
    email: string;
    telephone: string;
    nameContact: string;
    address: AddressResponse;
    observations: string;
    acceptsBarterDeals: boolean;
    barterTerms: string;
    totalRatings: number;
    createdAt: string;
}