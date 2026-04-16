import { AlertSeverity } from "./alert-severity";
import { AlertType } from "./alert-type";

export interface MarketAlert {
    id: string;
    commodity: string;
    type: AlertType;
    message: string;
    triggerValue: number;
    referenceDate: string;
    read: boolean;
    createdAt: string;
    severity: AlertSeverity;
}