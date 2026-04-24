export enum AssetValuationMethod {
    FIXED_VALUE = 'FIXED_VALUE',
    COMMODITY_LINKED = 'COMMODITY_LINKED',
    MARKET_APPRAISAL = 'MARKET_APPRAISAL'
}
  
export const AssetValuationMethodDesc: Record<AssetValuationMethod, string> = {
    [AssetValuationMethod.FIXED_VALUE]: 'Valor Fixo',
    [AssetValuationMethod.COMMODITY_LINKED]: 'Atrelado a Commodity',
    [AssetValuationMethod.MARKET_APPRAISAL]: 'Avaliação de Mercado'
};