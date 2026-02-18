import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { UserStep } from "./user-step";

export interface UserType {
    id: string;
    title: string;
    iconKey: string;
    icon: IconDefinition;
    description: string;
    steps: UserStep[];
}