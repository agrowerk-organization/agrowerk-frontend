export interface Toast {
    id: number;
    type: ToastType;
    message: string;    
}

export type ToastType = 'success' | 'error';