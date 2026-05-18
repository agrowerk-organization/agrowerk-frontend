import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption }     from 'echarts';
import { ActivePlantingService }   from '@core/services/active-planting.service';
import { ActivePlantingResponse }  from '@core/types/planting/active-planting.response';
import { BackButton } from '@shared/components/back-button/back-button';
import { ICONS_PLANTINGS } from '@core/ui/icons/icons-producer/icons-plantings/icons-plantings';

@Component({
  selector: 'app-plantings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, NgxEchartsModule, BackButton],
  providers: [{
    provide: NGX_ECHARTS_CONFIG,
    useValue: { echarts: () => import('echarts') }
  }],
  templateUrl: './plantings.html',
})
export class Plantings implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(ActivePlantingService);

  readonly icons = ICONS_PLANTINGS;
  readonly backLink = '/producer/dashboard';

  propertyId   = signal<string>('');
  propertyName = signal<string>('');
  loading      = signal(true);

  data = signal<ActivePlantingResponse[]>([]);

  totalArea = computed(() =>
    this.data().reduce((acc, d) => acc + d.areaHectares, 0)
  );

  totalActive = computed(() =>
    this.data().filter(d => d.plantingStatus === 'IN_PROGRESS').length
  );

  nextHarvest = computed(() => {
    const sorted = this.data()
      .filter(d => d.expectedHarvestDate)
      .sort((a, b) => a.expectedHarvestDate.localeCompare(b.expectedHarvestDate));
    return sorted[0] ?? null;
  });

  byCrop = computed(() => {
    const map: Record<string, number> = {};
    for (const d of this.data()) {
      map[d.cropName] = (map[d.cropName] ?? 0) + d.areaHectares;
    }
    return map;
  });

  donutChartOption = computed<EChartsOption>(() => {
    const entries = Object.entries(this.byCrop());
    if (!entries.length) return {};

    const colors = ['#22c55e','#FF9800','#3b82f6','#a855f7','#f43f5e','#14b8a6'];

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: '#171717',
        borderColor: '#22c55e',
        borderWidth: 2,
        textStyle: { color: '#22c55e', fontSize: 14 },
        formatter: '{b}: {c} ha ({d}%)'
      },
      legend: {
        bottom: 0,
        textStyle: { color: '#9ca3af', fontSize: 12 },
      },
      series: [{
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['50%', '43%'],
        data: entries.map(([name, value], i) => ({
          name, value,
          itemStyle: { color: colors[i % colors.length] }
        })),
        label: { show: false },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(34,197,94,0.4)' }
        }
      }]
    };
  });

  timelineChartOption = computed<EChartsOption>(() => {
    const items = this.data()
      .filter(d => d.plantingDate && d.expectedHarvestDate)
      .sort((a, b) => a.plantingDate.localeCompare(b.plantingDate));

      if (!items.length) {
        return {
            series: []
        } as EChartsOption;
    }

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#171717',
        borderColor: '#22c55e',
        borderWidth: 2,
        textStyle: { color: '#22c55e', fontSize: 13 },
      },
      grid: { left: '2%', right: '4%', bottom: '5%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: items.map(d => `${d.cropName} · ${d.fieldName}`),
        axisLabel: {
          color: '#FF9800', fontSize: 11, fontWeight: 'bold',
          rotate: items.length > 4 ? 15 : 0,
        },
        axisLine: { show: false }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#4CAF50', fontSize: 12 },
        splitLine: { lineStyle: { color: 'rgba(0,148,37,0.3)', type: 'dashed' } }
      },
      series: [{
        type: 'bar',
        data: items.map(d => d.areaHectares),
        barMaxWidth: 50,
        itemStyle: { color: '#22c55e', borderRadius: [8, 8, 0, 0] },
        label: {
          show: true, position: 'top',
          color: '#9ca3af', fontSize: 11,
          formatter: (p: { value: number }) => `${p.value} ha`
        }
      }]
    } as EChartsOption;
  });

  ngOnInit(): void {
    const snap = this.route.snapshot;
    const propertyId = snap.paramMap.get('propertyId') ?? '';
    this.propertyId.set(propertyId);
    this.propertyName.set(snap.queryParamMap.get('propertyName') ?? 'Propriedade');

   this.service.getByProperty(propertyId).subscribe({
      next:  data => { this.data.set(data ?? []); this.loading.set(false); },
      error: ()   => { this.data.set([]);          this.loading.set(false); },
    });
  }

  statusBadge(status: string): string {
    if (status === 'IN_PROGRESS') return 'border-green-500/60 text-green-400 bg-green-500/10';
    if (status === 'CANCELLED')   return 'border-red-500/60 text-red-400 bg-red-500/10';
    return 'border-yellow-500/60 text-yellow-400 bg-yellow-500/10';
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      IN_PROGRESS: 'Em andamento',
      CANCELLED:   'Cancelado',
      COMPLETED:   'Concluído',
    };
    return map[status] ?? status;
  }

  daysUntilHarvest(date: string): number {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
