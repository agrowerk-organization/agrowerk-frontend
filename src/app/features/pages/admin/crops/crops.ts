import {
  Component, inject, signal, computed, OnInit, DestroyRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CropService } from '@core/services/crop.service';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { CropCard } from './crops-components/crop-card/crop-card';
import { CropForm } from './crops-components/crop-form/crop-form';
import { ICONS_ADMIN_CROPS } from '@core/ui/icons/icons-admin/icons-admin-crops/icons-admin-crops';
import { CROP_CATEGORIES } from '@core/types/crop/crop-categories';
import { CreateCropRequest } from '@core/types/crop/create-crop.request';
import { UpdateCropRequest } from '@core/types/crop/update-crop.request';
import { CropResponse } from '@core/types/crop/crop.response';
import { CropFormPayload } from '@core/ui/types/crop/crop-category';
import { SearchBar } from '@shared/components/search-filter/search-bar';
@Component({
  selector: 'app-admin-crops',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ButtonPages,
    CropCard,
    CropForm,
    SearchBar
  ],
  templateUrl: './crops.html',
})
export class AdminCrops implements OnInit {
  private readonly cropService = inject(CropService);
  private readonly destroyRef  = inject(DestroyRef);
  private readonly search$     = new Subject<string>();

  readonly icons = ICONS_ADMIN_CROPS;

  readonly categories   = CROP_CATEGORIES;
  readonly PAGE_SIZE    = 12;

  crops            = signal<CropResponse[]>([]);
  loading          = signal(false);
  totalElements    = signal(0);
  currentPage      = signal(0);
  selectedCategory = signal<string>('ALL');
  searchTerm       = signal<string>('');

  modalOpen   = signal(false);
  editingCrop = signal<CropResponse | null>(null);
  saving      = signal(false);
  saveError   = signal<string | null>(null);

  readonly isEditing  = computed(() => !!this.editingCrop());
  readonly totalPages = computed(() =>
    Math.ceil(this.totalElements() / this.PAGE_SIZE)
  );
  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i)
  );
  readonly filteredCrops = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'ALL'
      ? this.crops()
      : this.crops().filter(c => c.cropCategory === cat);
  });

  constructor() {
    this.search$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term =>
        term.trim()
          ? this.cropService.search(term, 0, this.PAGE_SIZE)
          : this.cropService.list(0, this.PAGE_SIZE)
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(page => {
      this.crops.set(page.content!);
      this.totalElements.set(page.totalElements);
      this.currentPage.set(0);
    });
  }

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(page: number): void {
    this.loading.set(true);
    this.cropService.list(page, this.PAGE_SIZE).subscribe({
      next: res => {
        this.crops.set(res.content!);
        this.totalElements.set(res.totalElements);
        this.currentPage.set(page);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSearch(term: string): void {
    this.selectedCategory.set('ALL');
    this.search$.next(term);
  }

  onFilterChange(key: string | null): void {
    this.selectedCategory.set(key || 'ALL');
  }

  selectCategory(value: string): void {
    this.selectedCategory.set(value);
  }

  openCreate(): void {
    this.editingCrop.set(null);
    this.saveError.set(null);
    this.modalOpen.set(true);
  }

  openEdit(crop: CropResponse | null): void {
    this.editingCrop.set(crop);
    this.saveError.set(null);
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
    this.editingCrop.set(null);
  }

  handleSave({ data, file, isEdit }: CropFormPayload): void {
    this.saving.set(true);
    this.saveError.set(null);

    if (isEdit && this.editingCrop()) {
      const updateData = data as UpdateCropRequest;
      this.cropService.update(this.editingCrop()!.id, updateData).subscribe({
        next: updated => {
          this.uploadAndFinish(updated.id, file, () => {
            this.crops.update(list =>
              list.map(c => c.id === updated.id ? updated : c)
            );
          });
        },
        error: (err: { error: { message: string } }) => {
          this.saveError.set(err.error?.message ?? 'Erro ao atualizar cultura.');
          this.saving.set(false);
        },
      });
    } else {
      const createData = data as CreateCropRequest;
      this.cropService.create(createData).subscribe({
        next: created => {
          this.uploadAndFinish(created.id, file, () => {
            this.loadPage(0);
          });
        },
        error: (err: { error: { message: string } }) => {
          this.saveError.set(err.error?.message ?? 'Erro ao criar cultura.');
          this.saving.set(false);
        },
      });
    }
  }

  private uploadAndFinish(
    id: string,
    file: File | null,
    onSuccess: () => void
  ): void {
    if (!file) {
      onSuccess();
      this.saving.set(false);
      this.closeModal();
      return;
    }

    this.cropService.uploadPhoto(id, file).subscribe({
      next:  () => { onSuccess(); this.saving.set(false); this.closeModal(); },
      error: () => { onSuccess(); this.saving.set(false); this.closeModal(); },
    });
  }

  categoryLabel(value: string): string {
    return this.categories.find(c => c.value === value)?.label ?? value;
  }
}