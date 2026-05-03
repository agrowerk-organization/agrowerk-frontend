export enum PlantingStatus {
    PENDING     = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    HARVESTED   = 'HARVESTED',
    CANCELLED   = 'CANCELLED',
    FINISHED    = 'FINISHED',
};
  
export const PlantingStatusDesc: Record<PlantingStatus, string> = {
    [PlantingStatus.PENDING]:     'Pendente',
    [PlantingStatus.IN_PROGRESS]: 'Em Andamento',
    [PlantingStatus.HARVESTED]:   'Colhido',
    [PlantingStatus.CANCELLED]:   'Cancelado',
    [PlantingStatus.FINISHED]:    'Finalizado',
};
  
export const PlantingStatusColor: Record<PlantingStatus, string> = {
    [PlantingStatus.PENDING]:     'text-sky-400 border-sky-400',
    [PlantingStatus.IN_PROGRESS]: 'text-emerald-400 border-emerald-400',
    [PlantingStatus.HARVESTED]:   'text-lime-400 border-lime-400',
    [PlantingStatus.CANCELLED]:   'text-red-400 border-red-400',
    [PlantingStatus.FINISHED]:    'text-neutral-400 border-neutral-400',
};