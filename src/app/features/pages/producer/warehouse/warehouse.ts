import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WarehouseService } from '@core/services/warehouse.service';
import { WarehouseResponse } from '@core/types/warehouse/warehouse.response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BackButton } from '@shared/components/back-button/back-button';
import { WarehouseCard } from './warehouse-components/warehouse-card/warehouse-card';
import { WarehouseForm } from './warehouse-components/warehouse-form/warehouse-form';
import { ICONS_WAREHOUSE } from '@core/ui/icons/icons-producer/icons-warehouse/icons-warehouse';

@Component({
  selector: 'app-producer-warehouses',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ButtonPages,
    BackButton,
    WarehouseCard,
    WarehouseForm
  ],
  templateUrl: './warehouse.html',
})
export class Warehouse implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(WarehouseService);

  readonly icons = ICONS_WAREHOUSE;

  propertyId   = signal<string>('');
  propertyName = signal<string>('');

  loading     = signal(true);
  showForm    = signal(false);
  editTarget  = signal<WarehouseResponse | null>(null);
  warehouses  = signal<WarehouseResponse[]>([]);
  hasItems    = computed(() => this.warehouses().length > 0);

  ngOnInit(): void {
    const snap = this.route.snapshot;
    const parentSnap = this.route.parent?.snapshot;

    const pId = snap.paramMap.get('propertyId') ?? parentSnap?.paramMap.get('propertyId') ?? '';
    this.propertyId.set(pId);

    const queryMap = snap.queryParamMap;
    const parentQueryMap = parentSnap?.queryParamMap;

    this.propertyName.set(
      queryMap.get('propertyName') ?? 
      parentQueryMap?.get('propertyName') ?? 
      this.route.root.snapshot.queryParamMap.get('propertyName') ?? 
      'Propriedade'
    );

    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.service.findByProperty(this.propertyId()).subscribe({
      next:  list => { this.warehouses.set(list); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }

  openCreate(): void { this.editTarget.set(null); this.showForm.set(true); }
  openEdit(w: WarehouseResponse): void {
    this.showForm.set(false);        
    this.editTarget.set(w);
    setTimeout(() => this.showForm.set(true), 0);  
  }

  onSaved(saved: WarehouseResponse): void {
    this.showForm.set(false);
    this.editTarget.set(null);
    const idx = this.warehouses().findIndex(w => w.id === saved.id);
    this.warehouses.update(list =>
      idx >= 0 ? list.map(w => w.id === saved.id ? saved : w) : [saved, ...list]
    );
  }

  onDeactivate(w: WarehouseResponse): void {
    this.service.deactivateWarehouse(w.id).subscribe({
      next: () => this.warehouses.update(list =>
        list.map(wh => wh.id === w.id ? { ...wh, isActive: false } : wh)
      ),
    });
  }

  closeForm(): void { this.showForm.set(false); this.editTarget.set(null); }

  get backLink(): string {
    return `/producer/properties/${this.propertyId()}/plantings`;
  }
}