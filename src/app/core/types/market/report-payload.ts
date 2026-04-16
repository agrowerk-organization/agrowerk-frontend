import { Commodity } from "./commodity";

export interface ReportPayload {
    priceChangePercent: Record<Commodity, number>;
    highestPrice: Record<Commodity, number>;
    lowestPrice: Record<Commodity, number>;
    medianPrice: Record<Commodity, number>;
    averagePrice: Record<Commodity, number>;
    avgExchangeRate: number;
    exchangeRateVariation: number;
    highlights?: string[];
}