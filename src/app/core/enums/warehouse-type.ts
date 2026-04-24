export enum WarehouseType {
    SILO = 'SILO',
    WAREHOUSE = 'WAREHOUSE',
    COLD_STORAGE = 'COLD_STORAGE',
    OPEN_YARD = 'OPEN_YARD'
}
  
export const WarehouseTypeDesc: Record<WarehouseType, string> = {
    [WarehouseType.SILO]: 'Silo',
    [WarehouseType.WAREHOUSE]: 'Armazém',
    [WarehouseType.COLD_STORAGE]: 'Armazenamento Refrigerado',
    [WarehouseType.OPEN_YARD]: 'Pátio Aberto'
};