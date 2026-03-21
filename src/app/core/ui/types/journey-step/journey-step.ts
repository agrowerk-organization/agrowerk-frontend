import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface JourneyStep {
    number: string;
    icon: IconDefinition;
    title: string;
    description: string;
}