export enum StockType {
    INPUT = 'INPUT',
    PRODUCTION = 'PRODUCTION'
}
  
export const StockTypeDesc: Record<StockType, string> = {
    [StockType.INPUT]: 'Insumo',
    [StockType.PRODUCTION]: 'Produção'
};