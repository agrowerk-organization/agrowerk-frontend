import { Commodity } from "./commodity";

export interface CommodityPriceResponse {
    commodity: Commodity;
    price: number;
    priceUsd: number;
    ptaxRate: number;
    unit: string;
    referenceDate: string;
    variationPercent: number;
}