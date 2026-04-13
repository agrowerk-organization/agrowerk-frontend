import { AddAddressRequest } from "../address/add-address.request";

export interface UpdateFarmUnitRequest {
    name: string;
    area: number;
    address: AddAddressRequest
}