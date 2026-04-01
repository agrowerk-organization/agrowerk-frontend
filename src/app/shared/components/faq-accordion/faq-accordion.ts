import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FaqService } from '@core/services/faq.service';
import { FaqResponse } from '@core/types/faq/faq-response';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './faq-accordion.html'
})
export class FaqAccordion {
  faqs = input.required<FaqResponse[]>();
  activeId = signal<string | null>(null);

  private faqService = inject(FaqService);

  icons = { CHEVRON : faChevronDown };

  toggle(faq: FaqResponse) {
    if (this.activeId() === faq.id) {
      this.activeId.set(null);
      return;
    }

    this.activeId.set(faq.id);
    this.faqService.getOne(faq.id).subscribe();
    
  }

  isOpen(id: string): boolean {
    return this.activeId() === id;
  }
}
