import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Benefit } from "./benefit";

export interface RoleBenefit {
    id: number;
    title: string;
    subtitle: string;
    icon: IconDefinition,
    benefits: Benefit[];
}