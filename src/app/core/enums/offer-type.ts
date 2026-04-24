export enum OfferType {
    CROP = 'CROP',
    ASSET = 'ASSET'
}

export const OfferTypeDesc : Record<OfferType, string> = {
    [OfferType.CROP]: 'Cultura',
    [OfferType.ASSET]: 'Ativo'
};