import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Benefit {
    id: number;
    title: string;
    description: string;
    icon: IconDefinition;
    metric?: {
        value: string;
        label: string;
    }
}