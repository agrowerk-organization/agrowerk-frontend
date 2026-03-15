export interface LoginResponse {
    id: string;
    name: string;
    email: string;
    role: 'PRODUCER' | 'SYSTEM_ADMIN' | 'SUPPLIER_ADMIN';
}