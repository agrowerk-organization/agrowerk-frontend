import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface UserStep {
    number: number;
    title: string;
    description: string;
    iconKey: string;
    icon?: IconDefinition; 
    color: string;
    features: string[];
    image?: string;
}