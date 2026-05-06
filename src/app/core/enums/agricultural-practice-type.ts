export enum PracticeType {
    IRRIGATION       = 'IRRIGATION',
    FERTILIZATION    = 'FERTILIZATION',
    PEST_CONTROL     = 'PEST_CONTROL',
    WEED_CONTROL     = 'WEED_CONTROL',
    HARVEST          = 'HARVEST',
    PRUNING          = 'PRUNING',
    SOIL_PREPARATION = 'SOIL_PREPARATION',
    OTHER            = 'OTHER',
};
  
export const PracticeTypeDesc: Record<PracticeType, string> = {
    [PracticeType.IRRIGATION]:       'Irrigação',
    [PracticeType.FERTILIZATION]:    'Fertilização',
    [PracticeType.PEST_CONTROL]:     'Controle de Pragas',
    [PracticeType.WEED_CONTROL]:     'Controle de Ervas Daninhas',
    [PracticeType.HARVEST]:          'Colheita',
    [PracticeType.PRUNING]:          'Poda',
    [PracticeType.SOIL_PREPARATION]: 'Preparo do Solo',
    [PracticeType.OTHER]:            'Outro',
};
  
export const PracticeTypeColor: Record<PracticeType, string> = {
    [PracticeType.IRRIGATION]:       'text-sky-400 border-sky-400',
    [PracticeType.FERTILIZATION]:    'text-emerald-400 border-emerald-400',
    [PracticeType.PEST_CONTROL]:     'text-red-400 border-red-400',
    [PracticeType.WEED_CONTROL]:     'text-amber-400 border-amber-400',
    [PracticeType.HARVEST]:          'text-lime-400 border-lime-400',
    [PracticeType.PRUNING]:          'text-violet-400 border-violet-400',
    [PracticeType.SOIL_PREPARATION]: 'text-orange-400 border-orange-400',
    [PracticeType.OTHER]:            'text-neutral-400 border-neutral-400',
};