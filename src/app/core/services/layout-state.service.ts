import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LayoutStateService {
    showCycle = signal(true);
    toggle() {
        this.showCycle.update(show => !show);
    }
}