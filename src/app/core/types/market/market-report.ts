import { Commodity } from "../../enums/commodity";
import { ReportPayload } from "./report-payload";
import { ReportStatus } from "./report-status";
import { ReportType } from "./report-type";

export interface MarketReport {
    id: string;
    reportType: ReportType;
    commodity: Commodity | null;
    periodStart: string;
    periodEnd: string;
    summary: string;
    reportPayload: ReportPayload;
    generatedAt: string;
    status: ReportStatus;
}