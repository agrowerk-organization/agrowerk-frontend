import { CommonModule } from '@angular/common';
import { Component, input, computed } from '@angular/core';
import { Testimonial } from '../../../../../../../core/ui/types/testimonial/testimonial';
import { TestimonialMetric } from '../testimonial-metric/testimonial-metric';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ICONS_TESTIMONIALS } from '../../../../../../../core/ui/icons/icons.testimonials';
@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule, FaIconComponent, TestimonialMetric],
  templateUrl: './testimonial-card.html'
})
export class TestimonialCard {
  testimonial = input.required<Testimonial>();

  readonly icons = ICONS_TESTIMONIALS;

  avatarFallback = computed(() => {
    return this.testimonial().author.name
    .split(' ')
    .map((name) => name.charAt(0))
    .join('');  
  });

  stars = computed(() => Array(this.testimonial().rating).fill(0));
}
