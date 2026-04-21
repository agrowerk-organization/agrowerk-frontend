import { Component, computed, inject, signal, OnInit, ChangeDetectionStrategy, DestroyRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subject, debounceTime, distinctUntilChanged, tap, switchMap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { InputService } from "@core/services/input.service";
import { InputCategoryService } from "@core/services/input-category.service";
import { CreateInputRequest } from "@core/types/input/create-input.request";
import { UpdateInputRequest } from "@core/types/input/update-input-request";
import { InputResponse } from "@core/types/input/input.response";
import { InputCategoryResponse } from "@core/types/input/input-category.response";
import { Paginator } from "@shared/components/paginator/paginator";
import { SearchBar } from "@shared/components/search-filter/search-bar";
import { ButtonPages } from "@shared/components/buttons/button-pages/button-pages";
import { Title } from "@shared/components/title/title";
import { Subtitle } from "@shared/components/subtitle/subtitle";
import { InputCard } from "./inputs-components/input-card/input-card";
import { InputForm } from "./inputs-components/input-form/input-form";
import { ICONS_ADMIN_INPUTS } from "@core/ui/icons/icons-admin/icons-admin-inputs/icons-admin-inputs";
import { Router } from "@angular/router";
import { BackButton } from "@shared/components/back-button/back-button";

@Component({
  selector: 'app-admin-inputs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, FontAwesomeModule,
    Title, Subtitle, ButtonPages, SearchBar, Paginator,
    InputCard, InputForm, BackButton
  ],
  templateUrl: './inputs.html',
})
export class AdminInputs implements OnInit {
  private readonly inputService    = inject(InputService);
  private readonly categoryService = inject(InputCategoryService);
  private readonly router          = inject(Router);
  private readonly destroyRef      = inject(DestroyRef);

  readonly icons = ICONS_ADMIN_INPUTS;

  readonly loading       = signal(false);
  readonly saving        = signal(false);
  readonly inputs        = signal<InputResponse[]>([]);
  readonly categories    = signal<InputCategoryResponse[]>([]);
  readonly modalOpen     = signal(false);
  readonly editingInput  = signal<InputResponse | null>(null);
  readonly currentPage   = signal(0);
  readonly totalPages    = signal(0);
  readonly totalElements = signal(0);

  private readonly search$ = new Subject<string>();
  private searchTerm = '';
  private categoryId = '';

  readonly categoryFilters = computed(() =>
    this.categories().map(c => ({ key: c.id, value: c.id, label: c.name }))
  );

  readonly categoryOptions = computed(() =>
    this.categories().map(c => ({ value: c.id, label: c.name }))
  );

  constructor() {
    this.search$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.loading.set(true)),
      switchMap(term => {
        this.searchTerm = term;
        this.categoryId = '';
        return this.inputService.search(term, { page: 0, size: 9 });
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: res => {
        this.inputs.set(res.content ?? []);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.currentPage.set(0);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  ngOnInit(): void {
    this.categoryService.findFlat().subscribe(cats => this.categories.set(cats));
    this.loadPage(0);
  }

  openCategories(): void {
    this.router.navigate(['admin/input/categories']);
  }

  loadPage(page: number): void {
    this.loading.set(true);
    this.currentPage.set(page);

    const source$ = this.searchTerm
      ? this.inputService.search(this.searchTerm, { page, size: 9 })
      : this.categoryId
        ? this.inputService.findByCategory(this.categoryId, { page, size: 9 })
        : this.inputService.findCatalog({ page, size: 9 });

    source$.subscribe({
      next: (res) => {
        this.inputs.set(res.content ?? []);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSearch(term: string): void {
    this.search$.next(term);
  }

  onFilterChange(categoryId: string | null): void {
    this.categoryId = categoryId ?? '';
    this.searchTerm = '';
    this.loadPage(0);
  }

  openCreate(): void {
    this.editingInput.set(null);
    this.modalOpen.set(true);
  }

  openEdit(input: InputResponse): void {
    this.editingInput.set(input);
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
    this.editingInput.set(null);
  }

  handleSave(payload: CreateInputRequest | UpdateInputRequest): void {
    this.saving.set(true);
    const editing = this.editingInput();

    const source$ = editing
      ? this.inputService.updateInput(editing.id, payload as UpdateInputRequest)
      : this.inputService.createInput(payload as CreateInputRequest);

    source$.subscribe({
      next: () => {
        this.saving.set(false);
        this.closeModal();
        this.loadPage(this.currentPage());
      },
      error: () => this.saving.set(false),
    });
  }

  onDeactivate(id: string): void {
    this.inputService.deactivate(id).subscribe(() => this.loadPage(this.currentPage()));
  }
}