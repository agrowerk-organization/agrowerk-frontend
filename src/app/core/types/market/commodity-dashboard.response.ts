import { CommodityPriceResponse } from "./commodity-price.response";

export interface CommodityDashboardResponse {
    latestPrices: CommodityPriceResponse[];
    sojaHistory: CommodityPriceResponse[];
    milhoHistory: CommodityPriceResponse[];
    boiGordoHistory: CommodityPriceResponse[];
}