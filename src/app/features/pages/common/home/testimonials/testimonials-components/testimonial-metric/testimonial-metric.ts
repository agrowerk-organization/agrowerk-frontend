import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ICONS_TESTIMONIALS } from '@core/ui/icons/icons-common/icons-home/icons.testimonials';

@Component({
  selector: 'app-testimonial-metric',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './testimonial-metric.html'
})
export class TestimonialMetric {
  label = input.required<string | undefined>();
  value = input.required<string | undefined>();
  type = input<'success' | 'warning' | 'another'>('success');

  icon = computed(() => {
    const map = {
      success: ICONS_TESTIMONIALS.CHART_LINE,
      warning: ICONS_TESTIMONIALS.DOLLAR_SIGN,
      another: ICONS_TESTIMONIALS.STAR
    };
    return map[this.type()];
  });

  styles = computed(() => {
    const config = {
      success: {
        bg: 'bg-neutral-primary/10',
        border: 'border-success/80',
        text: 'text-success',
        icon: 'text-success',
        shadow: 'shadow-[0_8px_32px_rgba(0,180,0,0.25)]'
      },
      warning: {
        bg: 'bg-secondary/30',
        border: 'border-quartenary/80',
        text: 'text-quartenary',
        icon: 'text-quartenary',
        shadow: 'shadow-[0_8px_32px_rgba(255,160,0,0.25)]'
      },
      another: {
        bg: 'bg-secondary/80',
        border: 'border-secondary/50',
        text: 'text-secondary',
        icon: 'text-secondary',
        shadow: 'shadow-[0_8px_32px_rgba(100,100,255,0.25)]'
      }
    };
    return config[this.type()];
  });
}
