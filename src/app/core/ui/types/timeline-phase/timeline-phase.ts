import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface TimelinePhase {
    id: string;
    title: string;
    subtitle: string;
    icon: IconDefinition;
    color: string;
    bgGradient: string;
    features: string[];
    stats: {
      label: string;
      value: string;
      icon: IconDefinition;
    }[];
    image?: string;
    isActive?: boolean;
}