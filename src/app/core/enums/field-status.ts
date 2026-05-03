export enum FieldStatus {
    ACTIVE      = 'ACTIVE',
    PLANTED     = 'PLANTED',
    INACTIVE    = 'INACTIVE',
    RESTING     = 'RESTING',
    DEGRADED    = 'DEGRADED',
    MAINTENANCE = 'MAINTENANCE',
};
  
export const FieldStatusDesc: Record<FieldStatus, string> = {
    [FieldStatus.ACTIVE]:      'Ativo',
    [FieldStatus.PLANTED]:     'Plantado',
    [FieldStatus.INACTIVE]:    'Inativo',
    [FieldStatus.RESTING]:     'Em Repouso',
    [FieldStatus.DEGRADED]:    'Degradado',
    [FieldStatus.MAINTENANCE]: 'Em Manutenção',
};
  
export const FieldStatusColor: Record<FieldStatus, string> = {
    [FieldStatus.ACTIVE]:      'text-emerald-400 border-emerald-400',
    [FieldStatus.PLANTED]:     'text-lime-400 border-lime-400',
    [FieldStatus.INACTIVE]:    'text-neutral-400 border-neutral-400',
    [FieldStatus.RESTING]:     'text-sky-400 border-sky-400',
    [FieldStatus.DEGRADED]:    'text-red-400 border-red-400',
    [FieldStatus.MAINTENANCE]: 'text-amber-400 border-amber-400',
};