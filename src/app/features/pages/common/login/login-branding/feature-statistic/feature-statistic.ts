import { CommonModule } from '@angular/common';
import { Component, input, OnInit, OnDestroy } from '@angular/core';
import { Statistic } from '../../../../../../core/ui/types/login/statistic/statistic';

@Component({
  selector: 'app-feature-statistic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-statistic.html'
})
export class FeatureStatistic implements OnInit, OnDestroy {
  // Signals para Inputs (Angular 17.1+)
  statistics = input.required<Statistic[]>();
  animationDelay = input<number>(500); 
  animationSpeed = input<number>(30); 

  private counterIntervals: ReturnType<typeof setInterval>[] = [];

  ngOnInit(): void {
    this.statistics().forEach(statistic => {
      if (statistic.current === undefined) {
        statistic.current = 0;
      }
    });

    this.startCounterAnimations();
  }

  ngOnDestroy(): void {
    this.counterIntervals.forEach(interval => clearInterval(interval));
  }

  private startCounterAnimations(): void {
    setTimeout(() => {
      this.statistics().forEach((statistic) => {
        const increment = Math.max(statistic.value / 50, 1);
        
        const interval = setInterval(() => {
          if (statistic.current !== undefined) {
            statistic.current += increment;
            
            if (statistic.current >= statistic.value) {
              statistic.current = statistic.value;
              clearInterval(interval);
            }
          }
        }, this.animationSpeed()); 
        
        this.counterIntervals.push(interval);
      });
    }, this.animationDelay()); 
  }

  getFormattedStatistic(statistic: Statistic): string {
    const value = Math.floor(statistic.current || 0);
    return `${value}${statistic.suffix}`;
  }
}