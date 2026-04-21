export const ToxicologicalClass = {
    CLASS_I: { description: 'Extremamente tóxico', color: 'red' },
    CLASS_II: { description: 'Altamente tóxico', color: 'orange' },
    CLASS_III: { description: 'Moderadamente tóxico', color: 'yellow' },
    CLASS_IV: { description: 'Ligeiramente tóxico', color: 'blue' },
    NOT_CLASSIFIED: { description: 'Não classificado', color: 'gray' },
} as const; 

export type ToxicologicalClassKey = keyof typeof ToxicologicalClass;

export type ToxicologicalDetails = typeof ToxicologicalClass[ToxicologicalClassKey];