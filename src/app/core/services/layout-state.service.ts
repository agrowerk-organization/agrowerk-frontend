import { Injectable, signal } from '@angular/core';
import { PropertyResponse } from '@core/types/property/property.response';

@Injectable({
    providedIn: 'root'
})
export class LayoutStateService {
    showCycle = signal(false);
    activeProperty = signal<PropertyResponse | null>(null);
    toggle() {
        this.showCycle.update(show => !show);
    }
}

