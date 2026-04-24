import { CommodityPriceResponse } from "@core/types/market/commodity-price.response";

export type BarterPricePreview = CommodityPriceResponse & {
    bagPriceBrl: number;
    totalBagsDue: number;
};