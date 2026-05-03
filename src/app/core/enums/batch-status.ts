export enum BatchStatus {
    AVAILABLE = 'AVAILABLE',
    IN_USE    = 'IN_USE',
    DEPLETED  = 'DEPLETED',
    EXPIRED   = 'EXPIRED',
    BLOCKED   = 'BLOCKED',
}
  
export const BatchStatusDesc: Record<BatchStatus, string> = {
    [BatchStatus.AVAILABLE]: 'Disponível',
    [BatchStatus.IN_USE]:    'Em Uso',
    [BatchStatus.DEPLETED]:  'Esgotado',
    [BatchStatus.EXPIRED]:   'Expirado',
    [BatchStatus.BLOCKED]:   'Bloqueado',
};
  
export const BatchStatusColor: Record<BatchStatus, string> = {
    [BatchStatus.AVAILABLE]: 'text-emerald-400 border-emerald-400',
    [BatchStatus.IN_USE]:    'text-sky-400 border-sky-400',
    [BatchStatus.DEPLETED]:  'text-neutral-400 border-neutral-400',
    [BatchStatus.EXPIRED]:   'text-red-400 border-red-400',
    [BatchStatus.BLOCKED]:   'text-amber-400 border-amber-400',
};
  
export enum BatchReceiptStatus {
    PENDING   = 'PENDING',
    RECEIVED  = 'RECEIVED',
    CANCELLED = 'CANCELLED',
}
  
export const BatchReceiptStatusDesc: Record<BatchReceiptStatus, string> = {
    [BatchReceiptStatus.PENDING]:   'Pendente',
    [BatchReceiptStatus.RECEIVED]:  'Recebido',
    [BatchReceiptStatus.CANCELLED]: 'Cancelado',
};
  
export const BatchReceiptStatusColor: Record<BatchReceiptStatus, string> = {
    [BatchReceiptStatus.PENDING]:   'text-amber-400 border-amber-400',
    [BatchReceiptStatus.RECEIVED]:  'text-emerald-400 border-emerald-400',
    [BatchReceiptStatus.CANCELLED]: 'text-red-400 border-red-400',
};