export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    telephone: string;
    cpf: string;
    roleId: string;
}