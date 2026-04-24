export enum ContractStatus {
    DRAFT = 'DRAFT',
    AWAITING_OFFEROR_SIGNATURE = 'AWAITING_OFFEROR_SIGNATURE',
    AWAITING_ACCEPTOR_SIGNATURE = 'AWAITING_ACCEPTOR_SIGNATURE',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    EXPIRED = 'EXPIRED'
}

export const ContractStatusDesc: Record<ContractStatus, string> = {
    [ContractStatus.DRAFT]: 'Rascunho',
    [ContractStatus.AWAITING_OFFEROR_SIGNATURE]: 'Aguardando Assinatura do Ofertante',
    [ContractStatus.AWAITING_ACCEPTOR_SIGNATURE]: 'Aguardando Assinatura do Aceitante',
    [ContractStatus.ACTIVE]: 'Ativo',
    [ContractStatus.COMPLETED]: 'Finalizado',
    [ContractStatus.CANCELLED]: 'Cancelado',
    [ContractStatus.EXPIRED]: 'Expirado',
};