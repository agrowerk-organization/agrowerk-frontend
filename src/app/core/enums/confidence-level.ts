export enum ConfidenceLevel {
    LOW       = 'LOW',
    MEDIUM    = 'MEDIUM',
    HIGH      = 'HIGH',
    VERY_HIGH = 'VERY_HIGH',
}
  
export const ConfidenceLevelDesc: Record<ConfidenceLevel, string> = {
    [ConfidenceLevel.LOW]:       'Baixa',
    [ConfidenceLevel.MEDIUM]:    'Média',
    [ConfidenceLevel.HIGH]:      'Alta',
    [ConfidenceLevel.VERY_HIGH]: 'Muito Alta',
};
  
export const ConfidenceLevelColor: Record<ConfidenceLevel, string> = {
    [ConfidenceLevel.LOW]:       'text-red-400 border-red-400',
    [ConfidenceLevel.MEDIUM]:    'text-amber-400 border-amber-400',
    [ConfidenceLevel.HIGH]:      'text-emerald-400 border-emerald-400',
    [ConfidenceLevel.VERY_HIGH]: 'text-sky-400 border-sky-400',
};