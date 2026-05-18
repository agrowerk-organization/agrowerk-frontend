import { Injectable, signal } from '@angular/core';
import { ToastType } from '@core/ui/types/toast/toast';
import { Toast } from '@core/ui/types/toast/toast';
import { HttpErrorResponse } from '@core/ui/types/error/http-error-response';

@Injectable({ providedIn: 'root' })
export class ToastService {

  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  private nextId = 0;

  success(message: string, duration = 4000): void {
    this.show('success', message, duration);
  }

  error(message: string, duration = 5000): void {
    this.show('error', message, duration);
  }

  dismiss(id: number): void {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }

  httpError(err: HttpErrorResponse, fallback = 'Erro inesperado'): void {
    const body = err?.error;
    if (body?.validationErrors) {
      const first = Object.values(body.validationErrors)[0];
      
      const message = Array.isArray(first) ? first[0] : first;
      
      this.error(message ?? fallback);
    } else {
      this.error(body?.message ?? fallback);
    }
  }

  private show(type: ToastType, message: string, duration: number): void {
    const id = this.nextId++;
    this._toasts.update(list => [...list, { id, type, message }]);
    setTimeout(() => this.dismiss(id), duration);
  }
}