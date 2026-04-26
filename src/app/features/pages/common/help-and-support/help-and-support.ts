import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from "../../../../shared/components/title/title";
import { Subtitle } from "../../../../shared/components/subtitle/subtitle";
import { MeshGradient } from "../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../shared/components/pattern/pattern";
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { FaqService } from '@core/services/faq.service';
import { SearchFilter } from '@core/ui/types/search-filter/search-filter';
import { ICONS_HELP_AND_SUPPORT } from '@core/ui/icons/icons-common/icons-help-and-support/icons-help-and-support';
import { FaqResponse } from '@core/types/faq/faq-response';
import { FaqCategory } from '@core/types/faq/faq-category';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaqAccordion } from '@shared/components/faq-accordion/faq-accordion';
import { SearchBar } from '@shared/components/search-filter/search-bar';
@Component({
  selector: 'app-help-and-support',
  imports: [
    CommonModule,
    FontAwesomeModule,
    Title,
    Subtitle,
    MeshGradient,
    Pattern,
    Breadcrumb,
    FaqAccordion,
    SearchBar
  ],
  templateUrl: './help-and-support.html'
})
export class HelpAndSupport implements OnInit {
  private faqService = inject(FaqService);

  icons = ICONS_HELP_AND_SUPPORT;

  readonly searchFilters: SearchFilter[] = [
    { key: 'REGISTRATION', label: 'Cadastro',   icon: this.icons.BOOK_OPEN },
    { key: 'INVENTORY',    label: 'Estoque',    icon: this.icons.BOXES     },   
    { key: 'HARVESTS',     label: 'Safras',     icon: this.icons.WHEAT_AWN },
    { key: 'REPORTS',      label: 'Relatórios', icon: this.icons.CHART_BAR },
  ];

  allFaqs = signal<FaqResponse[]>([]);
  loading = signal(true);
  activeTab = signal<string | null>(null);
  searchTerm = signal('');

  filtered = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const tab  = this.activeTab();

    return this.allFaqs().filter(faq => {
      const matchesTab = tab == null || faq.faqCategory === tab as FaqCategory;
      const matchesSearch = !term
        || faq.question.toLowerCase().includes(term)
        || faq.answer.toLowerCase().includes(term);
      return matchesTab && matchesSearch;
    });
  });

  ngOnInit(): void {
    this.faqService.list(undefined, 0, 100).subscribe({
      next: res => {
        this.allFaqs.set(res.content ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
