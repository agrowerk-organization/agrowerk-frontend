import { ICONS_NAVBAR } from "../../ui/icons/icons-layouts/icons.navbar";
import { UserProfile } from "../User/user.profile";

export interface LoginProfileOption {
    label: string,
    role: UserProfile,
    icon: keyof typeof ICONS_NAVBAR
}