import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface BadgeIndex {
    icon?: IconDefinition;
    text: string;
    variant?: 'default' | 'danger' | 'warning' | 'success' | 'muted';
  }