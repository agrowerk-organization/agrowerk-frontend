import { AddAddressRequest } from "../address/add-address.request";
export interface UpdateSupplierRequest {
    corporateReason: string;
    fantasyName: string;
    stateRegistration: string;
    email: string;
    telephone: string;
    nameContact: string;
    address: AddAddressRequest;
    observations: string;
    acceptsBarterDeals: boolean;
    barterTerms: string;
}