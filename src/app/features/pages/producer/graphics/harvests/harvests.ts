import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption }     from 'echarts';
import { HarvestDashboardService } from '@core/services/harvest-dashboard.service';
import { HarvestDashboardResponse } from '@core/types/harvest/harvest-dashboard.response';
import { BackButton } from '@shared/components/back-button/back-button';
import { ICONS_PLANTINGS } from '@core/ui/icons/icons-producer/icons-plantings/icons-plantings';

@Component({
  selector: 'app-harvests',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, NgxEchartsModule, BackButton],
  providers: [{
    provide: NGX_ECHARTS_CONFIG,
    useValue: { echarts: () => import('echarts') }
  }],
  templateUrl: './harvests.html',
})
export class Harvests implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(HarvestDashboardService);

  readonly icons = ICONS_PLANTINGS;
  readonly backLink = '/producer/dashboard';
  
  propertyId   = signal<string>('');
  propertyName = signal<string>('');
  loading      = signal(true);

  data = signal<HarvestDashboardResponse[]>([]);

  totalHarvested  = computed(() =>
    this.data().reduce((acc, d) => acc + d.totalHarvestedKg, 0)
  );
  totalEstimated  = computed(() =>
    this.data().reduce((acc, d) => acc + d.estimatedQuantity, 0)
  );
  totalAvailable  = computed(() =>
    this.data().reduce((acc, d) => acc + d.availableQuantity, 0)
  );
  finalizedCount  = computed(() =>
    this.data().filter(d => d.finalized).length
  );
  avgAchievement  = computed(() => {
    const items = this.data().filter(d => d.achievementRate > 0);
    if (!items.length) return 0;
    return items.reduce((acc, d) => acc + d.achievementRate, 0) / items.length;
  });

  barChartOption = computed<EChartsOption>(() => {
    const items = this.data();
    if (!items.length) return {};

    const labels   = items.map(d => `${d.cropName}\n${d.fieldName}`);
    const harvested = items.map(d => d.totalHarvestedKg);
    const estimated = items.map(d => d.estimatedQuantity);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#171717',
        borderColor: '#22c55e',
        borderWidth: 2,
        textStyle: { color: '#22c55e', fontSize: 14 },
      },
      legend: {
        data: ['Colhido', 'Estimado'],
        textStyle: { color: '#9ca3af', fontSize: 12 },
        bottom: 0,
      },
      grid: { left: '2%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: {
          color: '#FF9800', fontSize: 11, fontWeight: 'bold',
          rotate: items.length > 4 ? 15 : 0,
        },
        axisLine: { show: false }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#4CAF50', fontSize: 12,
          formatter: (v: number) => `${v.toLocaleString('pt-BR')} kg`
        },
        splitLine: { lineStyle: { color: 'rgba(0,148,37,0.3)', type: 'dashed' } }
      },
      series: [
        {
          name: 'Colhido',
          type: 'bar',
          data: harvested,
          barMaxWidth: 40,
          itemStyle: { color: '#22c55e', borderRadius: [8, 8, 0, 0] }
        },
        {
          name: 'Estimado',
          type: 'bar',
          data: estimated,
          barMaxWidth: 40,
          itemStyle: { color: 'rgba(255,152,0,0.4)', borderRadius: [8, 8, 0, 0],
                       borderColor: '#FF9800', borderWidth: 2 }
        }
      ]
    };
  });

  achievementChartOption = computed<EChartsOption>(() => {
    const avg = this.avgAchievement();
    return {
      backgroundColor: 'transparent',
      series: [{
        type: 'gauge',
        radius: '85%',
        startAngle: 200,
        endAngle: -20,
        min: 0, max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 16,
            color: [
              [0.3, '#f43f5e'],
              [0.6, '#FF9800'],
              [1,   '#22c55e'],
            ]
          }
        },
        pointer: { itemStyle: { color: 'auto' }, length: '60%', width: 6 },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: {
          color: '#9ca3af', fontSize: 11,
          formatter: (v: number) => `${v}%`
        },
        detail: {
          valueAnimation: true,
          formatter: (v: number) => `${v.toFixed(1)}%`,
          color: '#22c55e',
          fontSize: 28,
          fontWeight: 'bold',
          offsetCenter: [0, '60%']
        },
        title: {
          offsetCenter: [0, '85%'],
          color: '#9ca3af',
          fontSize: 12,
          fontWeight: 'normal'
        },
        data: [{ value: avg, name: 'Taxa de Realização' }]
      }]
    };
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

  confidenceBadge(level: string): string {
    if (level === 'HIGH')   return 'border-green-500/60 text-green-400 bg-green-500/10';
    if (level === 'MEDIUM') return 'border-yellow-500/60 text-yellow-400 bg-yellow-500/10';
    return 'border-red-500/60 text-red-400 bg-red-500/10';
  }
}
