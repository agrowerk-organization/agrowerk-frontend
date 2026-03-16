import { AddressResponse } from "../address/address.response";

export interface FarmUnitResponse {
    id: string;
    name: string;
    area: number;
    response: AddressResponse;
}