import { AddAddressRequest } from "../address/add-address.request";

export interface CreateSupplierRequest {
    corporateReason: string;
    fantasyName: string;
    cnpj: string;
    stateRegistration: string;
    email: string;
    telephone: string;
    nameContact: string;
    address: AddAddressRequest;
    observations: string;
    acceptsBarterDeals: boolean;
    barterTerms: string;
}   