import { Commodity } from "./commodity";
import { CommodityPriceResponse } from "./commodity-price.response";

export interface CommodityDashboardResponse {
    latestPrices: CommodityPriceResponse[];
    history: Partial<Record<Commodity, CommodityPriceResponse[]>>
}