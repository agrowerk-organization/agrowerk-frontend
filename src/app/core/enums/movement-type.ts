export enum MovementType {
    PURCHASE = 'PURCHASE',
    BARTER_IN = 'BARTER_IN',
    TRANSFER_IN = 'TRANSFER_IN',
    HARVEST_IN = 'HARVEST_IN',
    INITIAL_BALANCE = 'INITIAL_BALANCE',
    PLANTING_USE = 'PLANTING_USE',
    BARTER_OUT = 'BARTER_OUT',
    TRANSFER_OUT = 'TRANSFER_OUT',
    LOSS = 'LOSS',
    RETURN = 'RETURN',
    POSITIVE_ADJUSTMENT = 'POSITIVE_ADJUSTMENT',
    NEGATIVE_ADJUSTMENT = 'NEGATIVE_ADJUSTMENT',
    REVERSAL = 'REVERSAL'
}

export const MovementTypeDetails: Record<MovementType, { label: string, increases: boolean }> = {
    [MovementType.PURCHASE]: { label: 'Compra', increases: true },
    [MovementType.BARTER_IN]: { label: 'Barter - Entrada', increases: true },
    [MovementType.TRANSFER_IN]: { label: 'Transferência - Entrada', increases: true },
    [MovementType.HARVEST_IN]: { label: 'Colheita - Entrada', increases: true },
    [MovementType.INITIAL_BALANCE]: { label: 'Saldo Inicial', increases: true },
    [MovementType.PLANTING_USE]: { label: 'Uso em Plantio', increases: false },
    [MovementType.BARTER_OUT]: { label: 'Barter - Saída', increases: false },
    [MovementType.TRANSFER_OUT]: { label: 'Transferência - Saída', increases: false },
    [MovementType.LOSS]: { label: 'Perda', increases: false },
    [MovementType.RETURN]: { label: 'Devolução', increases: false },
    [MovementType.POSITIVE_ADJUSTMENT]: { label: 'Ajuste Positivo', increases: true },
    [MovementType.NEGATIVE_ADJUSTMENT]: { label: 'Ajuste Negativo', increases: false },
    [MovementType.REVERSAL]: { label: 'Estorno', increases: true }
};