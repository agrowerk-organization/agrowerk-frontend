import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface FooterLink {
    label: string,
    icon: IconDefinition,
    action?: () => void,
    url?: string,
    external?: boolean
}