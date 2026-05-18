export interface StockMovementResponse {
    movementId:         string;    
    movementType:       string;    
    quantity:           number;    
    unitValue:          number;   
    totalValue:         number;   
    movementDate:       string;    
    propertyId:         string;    
    propertyName:       string;
    inputName:          string;
    userName:           string;
    batchNumber:        string;
    notes:              string;
    reversed:           boolean;   
    reversedMovementId: string | null;
}