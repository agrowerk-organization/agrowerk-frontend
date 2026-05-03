export enum BrazilRegion {
    NORTHEAST = 'NORTHEAST',
    NORTH     = 'NORTH',
    SOUTHEAST = 'SOUTHEAST',
    MIDWEST   = 'MIDWEST',
    SOUTH     = 'SOUTH',
    SEMIARID  = 'SEMIARID',
    MATOPIBA  = 'MATOPIBA',
    NATIONAL  = 'NATIONAL',
}
  
export const BrazilRegionDesc: Record<BrazilRegion, string> = {
    [BrazilRegion.NORTHEAST]: 'Nordeste',
    [BrazilRegion.NORTH]:     'Norte',
    [BrazilRegion.SOUTHEAST]: 'Sudeste',
    [BrazilRegion.MIDWEST]:   'Centro-Oeste',
    [BrazilRegion.SOUTH]:     'Sul',
    [BrazilRegion.SEMIARID]:  'Semiárido',
    [BrazilRegion.MATOPIBA]:  'MATOPIBA',
    [BrazilRegion.NATIONAL]:  'Nacional',
};