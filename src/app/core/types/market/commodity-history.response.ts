import { Commodity } from "./commodity";
import { CommodityPriceResponse } from "./commodity-price.response";

export interface CommodityHistoryResponse {
    commodity: Commodity;
    prices: CommodityPriceResponse[];
    totalRecords: number;
}