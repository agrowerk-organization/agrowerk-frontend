import { CommonModule } from "@angular/common";
import { Component, OnInit, computed, input, signal } from "@angular/core";

@Component({
    selector: 'app-counter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './counter.html'
})

export class Counter implements OnInit {
    targetValue = input.required<number>();
    prefix = input<string>('');
    suffix = input<string>(''); 

    currentDisplay = signal(0);

    formattedValue = computed(() => {
        const value = this.currentDisplay();
        const formatted = value >= 1000 ? Math.floor(value).toLocaleString('pt-BR') : value.toFixed(this.suffix() === 'M' ? 1 : 0);
        return `${this.prefix()}${formatted}${this.suffix()}`;
    });

    ngOnInit(): void {
        this.animate();
    }

    private animate() {
        const duration = 2000;
        const end = this.targetValue();
        const increment = end / ( duration / 20);

        const timer = setInterval(() => {
            this.currentDisplay.update((val) => {
                if (val >= end) {
                    clearInterval(timer);
                    return end;
                } else {
                    return val + increment;
                }
            });
        }, 20);
    }
}