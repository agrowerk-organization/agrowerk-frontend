export enum SeasonStatus {
    PLANNED     = 'PLANNED',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED    = 'FINISHED',
    CANCELLED   = 'CANCELLED',
};
  
export const SeasonStatusDesc: Record<SeasonStatus, string> = {
    [SeasonStatus.PLANNED]:     'Planejada',
    [SeasonStatus.IN_PROGRESS]: 'Em Andamento',
    [SeasonStatus.FINISHED]:    'Finalizada',
    [SeasonStatus.CANCELLED]:   'Cancelada',
};
  
export const SeasonStatusColor: Record<SeasonStatus, string> = {
    [SeasonStatus.PLANNED]:     'text-sky-400 border-sky-400',
    [SeasonStatus.IN_PROGRESS]: 'text-emerald-400 border-emerald-400',
    [SeasonStatus.FINISHED]:    'text-neutral-400 border-neutral-400',
    [SeasonStatus.CANCELLED]:   'text-red-400 border-red-400',
};