import { UpdateAddressRequest } from "../address/update-address.request";
import { UpdateFarmUnitRequest } from "./update-farm-unit.request";

export interface UpdatePropertyRequest {
    name?: string;
    ruralRegistration?: string;
    latitude?: number;
    longitude?: number;
    plantedArea?: number;
    totalArea?: number;
    mainCrop?: string;
    isActive?: boolean;
    address?: UpdateAddressRequest;
    units?: UpdateFarmUnitRequest[];
}