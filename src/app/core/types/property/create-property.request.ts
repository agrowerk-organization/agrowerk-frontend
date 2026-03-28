import { AddAddressRequest } from "../address/add-address.request";
import { AddFarmUnitRequest } from "./add-farm-unit.request";

export interface CreatePropertyRequest {
    name: string;
    stateRegistration?: string;
    ruralRegistration?: string;
    address: AddAddressRequest;
    latitude?: number;
    longitude?: number;
    totalArea?: number;
    plantedArea?: number;
    mainCrop?: string;
    stateId?: string;
    units?: AddFarmUnitRequest[]
}