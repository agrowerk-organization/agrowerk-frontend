export interface AuthSocial {
    id: number,
    name: string,
    description: string,
    icon: string,
    action: () => void
}