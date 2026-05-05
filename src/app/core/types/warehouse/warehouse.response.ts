export interface WarehouseResponse {
    id: string;
    name: string;
    code: string;
    warehouseType: string;
    capacityKg: number;
    currentOccupancyKg: number;
    availableCapacityKg: number;
    location: string;
    description: string;
    isActive: boolean;
    propertyId: string;
    propertyName: string;
    createdAt: string;
    updatedAt: string;
}