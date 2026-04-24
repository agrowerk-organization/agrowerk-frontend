export enum TransactionStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    DISPUTED = 'DISPUTED'
}

export const TransactionStatusDesc : Record<TransactionStatus, string> = {
    [TransactionStatus.PENDING]: 'Pendente',
    [TransactionStatus.CONFIRMED]: 'Confirmado',
    [TransactionStatus.IN_PROGRESS]: 'Em Andamento',
    [TransactionStatus.COMPLETED]: 'Concluído',
    [TransactionStatus.CANCELLED]: 'Cancelado',
    [TransactionStatus.DISPUTED]: 'Disputado'
};