import { WarehouseType } from "@core/enums/warehouse-type";

export interface UpdateWarehouseRequest {
    name?: string
    code?: string
    warehouseType?: WarehouseType
    capacityKg?: number
    location?: string
    description?: string
}