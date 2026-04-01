import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LayoutStateService {
    showCycle = signal(false);
    toggle() {
        this.showCycle.update(show => !show);
    }
}

