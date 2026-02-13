import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface StatisticsHome {
    id: number;
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
    icon: IconDefinition;
    color: string;
    trend?: {
        value: string;
        label: string;
    }
}