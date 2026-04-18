import { Component, computed, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './paginator.html',
})
export class Paginator {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  readonly icons = {
    PREV: faChevronLeft,
    NEXT: faChevronRight
  };

  readonly pageItems = computed<(number | '...')[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const result: (number | '...')[] = [0];

    const left = current - 1;
    const right = current + 1;

    if (left > 1) {
      result.push('...');
    }

    for (let i = Math.max(1, left); i <= Math.min(total - 1, right); i++) {
      result.push(i);
    }

    if (right < total - 2) {
      result.push('...');
    }

    result.push(total - 1);

    return result;
  });

  go(page: number): void {
    const p = this.currentPage();
    const t = this.totalPages();
    if (page < 0 || page >= t || page === p) {
      return;
    }

    this.pageChange.emit(page);
  }

}
