import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }       from '@angular/common';
import { ActivatedRoute }     from '@angular/router';
import { FontAwesomeModule }  from '@fortawesome/angular-fontawesome';
import { FieldService }       from '@core/services/field.service';
import { FieldResponse }      from '@core/types/field/field.response';
import { Page }                   from '@core/types/page/page';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { Paginator } from '@shared/components/paginator/paginator';
import { FieldCard } from './field-components/field-card/field-card';
import { FieldForm } from './field-components/field-form/field-form';
import { ICONS_PRODUCER_FIELDS } from '@core/ui/icons/icons-producer/icons-field/icons-field';

@Component({
  selector: 'app-fields',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ButtonPages,
    BackButton,
    Paginator,
    FieldCard,
    FieldForm
  ],
  templateUrl: './fields.html',
})
export class Fields implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(FieldService);

  readonly icons = ICONS_PRODUCER_FIELDS;

  propertyId   = signal<string>('');
  propertyName = signal<string>('');

  loading    = signal(true);
  showForm   = signal(false);
  editTarget = signal<FieldResponse | null>(null);

  page     = signal<Page<FieldResponse> | null>(null);
  currentPage = signal(0);
  pageSize    = 10;

  fields   = computed(() => this.page()?.content ?? []);
  hasItems = computed(() => this.fields().length > 0);
  total    = computed(() => this.page()?.totalPages ?? 0);

  ngOnInit(): void {
    const id   = this.route.snapshot.paramMap.get('propertyId') ?? '';
    const name = this.route.snapshot.queryParamMap.get('propertyName') ?? 'Propriedade';
    this.propertyId.set(id);
    this.propertyName.set(name);
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.service.findByProperty(this.propertyId(), {
      page: this.currentPage(),
      size: this.pageSize,
    }).subscribe({
      next:  p  => { this.page.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.editTarget.set(null);
    this.showForm.set(true);
  }

  openEdit(field: FieldResponse): void {
    this.editTarget.set(field);
    this.showForm.set(true);
  }

  onSaved(saved: FieldResponse): void {
    this.showForm.set(false);
    this.editTarget.set(null);
    const current = this.page();
    if (!current) { this.load(); return; }
    const idx = (current.content ?? []).findIndex(f => f.id === saved.id);
    const updated = idx >= 0
      ? current.content!.map(f => f.id === saved.id ? saved : f)
      : [saved, ...current.content ?? []];
    this.page.set({ ...current, content: updated });
  }

  onPageChange(p: number): void {
    this.currentPage.set(p);
    this.load();
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editTarget.set(null);
  }
}