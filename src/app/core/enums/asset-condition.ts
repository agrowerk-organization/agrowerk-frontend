export enum AssetCondition {
    NEW = 'NEW',
    EXCELLENT = 'EXCELLENT',
    GOOD = 'GOOD',
    FAIR = 'FAIR',
    POOR = 'POOR'
}
  
export const AssetConditionDesc: Record<AssetCondition, string> = {
    [AssetCondition.NEW]: 'Novo',
    [AssetCondition.EXCELLENT]: 'Excelente',
    [AssetCondition.GOOD]: 'Bom',
    [AssetCondition.FAIR]: 'Regular',
    [AssetCondition.POOR]: 'Ruim'
};