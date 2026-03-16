import { ICONS_NAVBAR } from "../../ui/icons/icons-common/icons-layouts/icons.navbar";
import { UserProfile } from "../user/user.profile";

export interface LoginProfileOption {
    label: string,
    role: UserProfile,
    icon: keyof typeof ICONS_NAVBAR
}