import { AddressResponse } from "../address/address.response";
import { FarmUnitResponse } from "./farm-unit.response";

export interface PropertyResponse {
    id: string;
    name: string;
    stateRegistration: string;
    ruralRegistration: string;
    address: AddressResponse;
    latitude: number;
    longitude: number;
    totalArea: number;
    plantedArea: number;
    mainCrop: string;
    isActive: boolean;
    stateAbbreviation: string;
    stateName: string;
    hasWeatherLocation: boolean;
    units?: FarmUnitResponse[];
    createdAt: string;
}