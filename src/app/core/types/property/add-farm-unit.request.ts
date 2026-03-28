import { AddAddressRequest } from "../address/add-address.request";

export interface AddFarmUnitRequest {
    name: string;
    area: number;
    address: AddAddressRequest;
}