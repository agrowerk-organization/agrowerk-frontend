import { CommonModule } from '@angular/common';
import { Component, input, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { Statistic } from '../../../../../../core/ui/types/login/statistic/statistic';

@Component({
  selector: 'app-feature-statistic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-statistic.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureStatistic implements OnInit, OnDestroy {
  readonly statistics = input.required<Statistic[]>();
  readonly animationDelay = input<number>(500);

  readonly displayValues = signal<number[]>([]);

  private animationIds: number[] = [];
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  ngOnInit(): void {
    this.displayValues.set(this.statistics().map(() => 0));
    
    this.timeoutId = setTimeout(() => {
      this.startAnimations();
    }, this.animationDelay());
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.animationIds.forEach(id => cancelAnimationFrame(id));
  }

  private startAnimations(): void {
    const stats = this.statistics();
    
    stats.forEach((statistic, index) => {
      const duration = 1500;
      const startTime = performance.now();
      const targetValue = statistic.value;

      const tick = (now: number): void => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easedProgress * targetValue);

        this.displayValues.update(values => {
          const updated = [...values];
          updated[index] = currentValue;
          return updated;
        });

        if (progress < 1) {
          this.animationIds[index] = requestAnimationFrame(tick);
        }
      };

      this.animationIds[index] = requestAnimationFrame(tick);
    });
  }

  getFormattedStatistic(index: number, suffix: string): string {
    const values = this.displayValues();
    const val = values[index] ?? 0;
    return `${val}${suffix}`;
  }
}