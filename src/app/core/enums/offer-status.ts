export enum OfferStatus {
    ACTIVE = 'ACTIVE',
    ACCEPTED = 'ACCEPTED',
    COMPLETED = 'COMPLETED',
    EXPIRED = 'EXPIRED',
    CANCELLED = 'CANCELLED'
}

export const OfferStatusDesc: Record<OfferStatus, string> = {
    [OfferStatus.ACTIVE]: 'Ativo',
    [OfferStatus.ACCEPTED]: 'Aceito',
    [OfferStatus.COMPLETED]: 'Concluido',
    [OfferStatus.EXPIRED]: 'Expirado',
    [OfferStatus.CANCELLED]: 'Cancelado'
};