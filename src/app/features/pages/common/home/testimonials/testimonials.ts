import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from "@shared/components/title/title";
import { Subtitle } from "@shared/components/subtitle/subtitle";
import { Carousel } from '@shared/components/carousel/carousel';
import { Testimonial } from '@core/ui/types/testimonial/testimonial';
import { ICONS_TESTIMONIALS } from '@core/ui/icons/icons-common/icons-home/icons.testimonials';
import { TestimonialCard } from './testimonials-components/testimonial-card/testimonial-card';
import TESTIMONIALS_DATA from '@assets/files/home/testimonials.json';
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    CommonModule,
    Title,
    Subtitle,
    Carousel,
    TestimonialCard
  ],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  icons = ICONS_TESTIMONIALS;

  testimonials: Testimonial[] = TESTIMONIALS_DATA;
}