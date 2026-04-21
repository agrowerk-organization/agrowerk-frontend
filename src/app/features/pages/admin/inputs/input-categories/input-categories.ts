import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, OnInit, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputCategoryService } from '@core/services/input-category.service';
import { CreateInputCategoryRequest } from '@core/types/input/create-input-category.request';
import { UpdateInputCategoryRequest } from '@core/types/input/update-input-category.request';
import { InputCategoryResponse } from '@core/types/input/input-category.response';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { InputCategoryCard } from '../inputs-components/input-category-card/input-category-card';
import { InputCategoryForm } from '../inputs-components/input-category-form/input-category-form';
import { ICONS_ADMIN_INPUTS } from '@core/ui/icons/icons-admin/icons-admin-inputs/icons-admin-inputs';
import { BackButton } from '@shared/components/back-button/back-button';

@Component({
  selector: 'app-input-categories',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule,
    Title, Subtitle, ButtonPages,
    InputCategoryCard, InputCategoryForm,
    BackButton
  ],
  templateUrl: './input-categories.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCategories implements OnInit {
  private readonly categoryService = inject(InputCategoryService);
  private readonly destroyRef      = inject(DestroyRef);

  readonly icons = ICONS_ADMIN_INPUTS;

  readonly loading         = signal(false);
  readonly saving          = signal(false);
  readonly categories      = signal<InputCategoryResponse[]>([]);
  readonly modalOpen       = signal(false);
  readonly editingCategory = signal<InputCategoryResponse | null>(null);
  readonly totalElements   = signal(0);
  readonly searchTerm      = signal('');

  private readonly search$ = new Subject<string>();

  // Filtragem client-side — evita requisição a cada tecla
  readonly filteredCategories = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.categories();
    return this.categories().filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.description?.toLowerCase().includes(term)
    );
  });

  readonly parentOptions = computed(() => [
    { value: '', label: 'Nenhuma (raiz)' },
    ...this.categories()
      .filter(c => !c.parentId)
      .map(c => ({ value: c.id, label: c.name }))
  ]);

  constructor() {
    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(term => this.searchTerm.set(term));
  }

  ngOnInit(): void {
    this.load();
  }

  onSearch(term: string): void {
    this.search$.next(term);
  }

  load(): void {
    this.loading.set(true);
    this.categoryService.findFlat().subscribe({
      next: (cats) => {
        this.categories.set(cats);
        this.totalElements.set(cats.length);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void   { this.editingCategory.set(null); this.modalOpen.set(true); }
  openEdit(cat: InputCategoryResponse): void { this.editingCategory.set(cat); this.modalOpen.set(true); }
  closeModal(): void   { this.modalOpen.set(false); this.editingCategory.set(null); }

  handleSave(payload: CreateInputCategoryRequest | UpdateInputCategoryRequest): void {
    this.saving.set(true);
    const editing = this.editingCategory();

    const source$ = editing
      ? this.categoryService.updateCategory(editing.id, payload as UpdateInputCategoryRequest)
      : this.categoryService.createCategory(payload as CreateInputCategoryRequest);

    source$.subscribe({
      next: () => { this.saving.set(false); this.closeModal(); this.load(); },
      error: () => this.saving.set(false),
    });
  }

  onDeactivate(id: string): void {
    this.categoryService.deactivate(id).subscribe(() => this.load());
  }
}