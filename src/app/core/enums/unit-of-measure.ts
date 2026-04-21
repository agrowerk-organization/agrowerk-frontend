export const UnitOfMeasure = {
    KILOGRAM: { abbreviation: 'kg', description: 'Quilograma' },
    LITER: { abbreviation: 'L', description: 'Litro' },
    BAG: { abbreviation: 'sc', description: 'Saco' },
    UNIT: { abbreviation: 'un', description: 'Unidade' },
    TON: { abbreviation: 't', description: 'Tonelada' },
    MILLILITER: { abbreviation: 'ml', description: 'Mililitro' },
    GRAM: { abbreviation: 'g', description: 'Grama' },
    HECTARE: { abbreviation: 'ha', description: 'Hectare' },
    METERS: { abbreviation: 'm', description: 'Metros' },
} as const;
  
export type UnitOfMeasureKey = keyof typeof UnitOfMeasure;
  
export type UnitAbbreviation = typeof UnitOfMeasure[UnitOfMeasureKey]['abbreviation'];

export interface UnitInfo {
    readonly abbreviation: string;
    readonly description: string;
}