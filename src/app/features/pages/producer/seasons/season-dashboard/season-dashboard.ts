import {
  Component, input, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FontAwesomeModule }       from '@fortawesome/angular-fontawesome';
import { SeasonDashboardService } from '@core/services/season-dashboard.service';
import { SeasonDashboardResponse } from '@core/types/season/season-dashboard.response';
import { SeasonGroup } from '@core/ui/types/season/season-group';
import { ICONS_PRODUCER_SEASONS } from '@core/ui/icons/icons-producer/icons-seasons/icons-seasons';

@Component({
  selector: 'app-season-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './season-dashboard.html',
})
export class SeasonDashboard implements OnInit {
  private readonly service = inject(SeasonDashboardService);
 
  propertyId = input.required<string>();
 
  readonly icons = ICONS_PRODUCER_SEASONS;
 
  loading  = signal(true);
  rows     = signal<SeasonDashboardResponse[]>([]);
  hasData  = computed(() => this.rows().length > 0);
 
  seasons = computed<SeasonGroup[]>(() => {
    const map = new Map<string, SeasonDashboardResponse[]>();
    for (const r of this.rows()) {
      const list = map.get(r.seasonId) ?? [];
      list.push(r);
      map.set(r.seasonId, list);
    }
    return [...map.entries()].map(([seasonId, items]) => ({
      seasonId,
      seasonName:     items[0].seasonName,
      items,
      totalArea:      items.reduce((s, i) => s + (i.totalArea      ?? 0), 0),
      totalProduced:  items.reduce((s, i) => s + (i.totalProducedKg ?? 0), 0),
      totalPlantings: items.reduce((s, i) => s + (i.totalPlantings  ?? 0), 0),
    }));
  });
 
  ngOnInit(): void {
    this.load();
  }
 
  load(): void {
    this.loading.set(true);
    this.service.getDashboard(this.propertyId()).subscribe({
      next:  list => { this.rows.set(list); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }
}
