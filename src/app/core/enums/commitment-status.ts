export enum CommitmentStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PARTIALLY_DELIVERED = 'PARTIALLY_DELIVERED',
    DELIVERED = 'DELIVERED',
    OVERDUE = 'OVERDUE',
    CANCELLED = 'CANCELLED'
}

export const CommitmentStatsDesc: Record<CommitmentStatus, string> = {
    [CommitmentStatus.PENDING]: 'Pendente',
    [CommitmentStatus.CONFIRMED]: 'Confirmado',
    [CommitmentStatus.PARTIALLY_DELIVERED]: 'Parcialmente Entregue',
    [CommitmentStatus.DELIVERED]: 'Entregue',
    [CommitmentStatus.OVERDUE]: 'Atrasado',
    [CommitmentStatus.CANCELLED]: 'Cancelado'
};