export enum AssetCategory {
    EQUIPMENT = 'EQUIPMENT',
    TOOL = 'TOOL',
    INPUT = 'INPUT',
    SEED = 'SEED',
    FERTILIZER = 'FERTILIZER',
    PESTICIDE = 'PESTICIDE',
    OTHER = 'OTHER'
}
  
export const AssetCategoryDesc: Record<AssetCategory, string> = {
    [AssetCategory.EQUIPMENT]: 'Equipamento',
    [AssetCategory.TOOL]: 'Ferramenta',
    [AssetCategory.INPUT]: 'Insumo',
    [AssetCategory.SEED]: 'Semente',
    [AssetCategory.FERTILIZER]: 'Fertilizante',
    [AssetCategory.PESTICIDE]: 'Pesticida',
    [AssetCategory.OTHER]: 'Outros'
};