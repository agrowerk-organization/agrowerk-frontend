import { CommonModule } from "@angular/common";
import {
  Component, OnInit, OnDestroy, ElementRef,
  computed, input, signal, inject, NgZone
} from "@angular/core";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.html'
})
export class Counter implements OnInit, OnDestroy {
  targetValue = input.required<number>();
  prefix = input<string>('');
  suffix = input<string>('');

  currentDisplay = signal(0);

  formattedValue = computed(() => {
    const value = this.currentDisplay();
    const formatted = value >= 1000
      ? Math.floor(value).toLocaleString('pt-BR')
      : value.toFixed(this.suffix() === 'M' ? 1 : 0);
    return `${this.prefix()}${formatted}${this.suffix()}`;
  });

  private el = inject(ElementRef);
  private ngZone = inject(NgZone);

  private observer!: IntersectionObserver;
  private animationId!: number;
  private hasAnimated = false;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.observer.disconnect();
          this.animate();
        }
      },
      { threshold: 0.3 } 
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // ✅ Limpa tudo ao destruir o componente
    this.observer?.disconnect();
    cancelAnimationFrame(this.animationId);
  }

  private animate(): void {
    const duration = 2000;
    const end = this.targetValue();
    const startTime = performance.now();

    this.ngZone.runOutsideAngular(() => {
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * end;

        this.ngZone.run(() => this.currentDisplay.set(current));

        if (progress < 1) {
          this.animationId = requestAnimationFrame(tick);
        }
      };

      this.animationId = requestAnimationFrame(tick);
    });
  }
}