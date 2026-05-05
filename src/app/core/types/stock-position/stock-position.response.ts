export interface StockPositionResponse {
    stockId:              string;
    propertyId:           string;
    propertyName:         string;
    inputName:            string;
    categoryName:         string;
    stockType:            string;
    currentQuantity:      number;
    reservedQuantity:     number;
    availableQuantity:    number;
    weightedAverageCost:  number;
    totalValue:           number;
    minimumStock:         number;
    maximumStock:         number;
    stockAlert:           string;
    warehouseName:        string;
    lastEntryDate:        string;
    lastExitDate:         string;
}
  