import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Content {
    title?: string,
    subtitle?: string,
    quantity?: number,
    icon: IconDefinition,
    action?: () => void,
    type?: string
}