import { WarehouseType } from "@core/enums/warehouse-type";

export interface CreateWarehouseRequest {
    propertyId: string;
    name: string;
    code?: string;
    warehouseType: WarehouseType;
    capacityKg?: number;
    location?: string;
    description?: string;
}