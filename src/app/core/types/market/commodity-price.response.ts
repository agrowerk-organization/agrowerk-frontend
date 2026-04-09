import { Commodity } from "./commodity";

export interface CommodityPriceResponse {
    commodity: Commodity;
    price: number;
    unit: string;
    referenceDate: string;
    variationPercent: number | null;
}