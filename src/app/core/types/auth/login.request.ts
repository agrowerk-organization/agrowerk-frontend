import { AccessProfile } from "@core/enums/access-profile";

export interface LoginRequest {
    email : string;
    password : string;
    roleType: AccessProfile;
}