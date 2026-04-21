export const HazardLevel = {
    LOW: { label: 'Baixo', color: 'green' },
    MODERATE: { label: 'Médio', color: 'yellow' },
    HIGH: { label: 'Alto', color: 'orange' },
    CRITICAL: { label: 'Crítico', color: 'red' }
} as const;

export type HazardLevelKey = keyof typeof HazardLevel;