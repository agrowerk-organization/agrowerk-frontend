import { Commodity } from "./commodity";

export interface ReportPayload {
    priceChangePercent: Record<Commodity, number>;
    highestPrice: Record<Commodity, number>;
    lowestPrice: Record<Commodity, number>;
    avgExchangeRate: number;
    highlights?: string[];
}