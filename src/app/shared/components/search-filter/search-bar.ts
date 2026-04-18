import { CommonModule } from '@angular/common';
import { Component, input, inject, DestroyRef, OnInit, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchFilter } from '@core/ui/types/search-filter/search-filter';
import { FilterMode } from '@core/ui/types/search-filter/filter-mode';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './search-bar.html'
})
export class SearchBar implements OnInit {
  placeholder = input<string>('Buscar...');
  filters = input<SearchFilter[]>([]);
  filterMode = input<FilterMode>('buttons');
  debounceMs = input<number>(300);
  allLabel = input<string>('Todas');

  searchChange = output<string>();
  filterChange = output<string | null>();

  readonly icons = {
    SEARCH: faSearch,
    FILTER: faFilter,
    X_MARK: faXmark
  };

  searchControl = new FormControl('');
  activeFilter = signal<string | null>(null);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(this.debounceMs()),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(value => this.searchChange.emit(value ?? ''));
  }


  setFilter(key: string | null) {
    this.activeFilter.set(key);
    this.filterChange.emit(key);
  }

  onDropdownChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.setFilter(value || null);
  }

  clearSearch() {
    this.searchControl.setValue('');
  }

  get hasFilters(): boolean {
    return this.filters().length > 0;
  }

}
