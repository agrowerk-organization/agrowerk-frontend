import { AddressResponse } from "../address/address.response";

export interface UserProfileResponse {
    id: string;
    name: string;
    email: string;
    telephone: string;
    cpf: string;
    addressResponse: AddressResponse;
    emailVerified: boolean;
    phoneVerified: boolean;
    mfaEnabled: boolean;
    lastLogin: string;
    lastPasswordChange: string;
    requirePasswordChange: boolean;
    termsAccepted: boolean;
    privacyPolicyAccepted: boolean;
    marketingConsent: boolean;
    createdAt: string;
    avatarUrl: string | null;
}