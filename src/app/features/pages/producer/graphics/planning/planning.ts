import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption }     from 'echarts';
import { SeasonDashboardService } from '@core/services/season-dashboard.service';
import { SeasonDashboardResponse } from '@core/types/season/season-dashboard.response';
import { BackButton } from '@shared/components/back-button/back-button';
import { ICONS_GRAPHICS } from '@core/ui/icons/icons-producer/icons-graphics/icons-graphics';

@Component({
  selector: 'app-planning',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxEchartsModule,
    BackButton,
  ],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts: () => import('echarts') }
    }
  ],
  templateUrl: './planning.html',
})
export class Planning implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(SeasonDashboardService);

  readonly icons = ICONS_GRAPHICS;
  readonly backLink = '/producer/dashboard';

  propertyId   = signal<string>('');
  propertyName = signal<string>('');
  seasonId     = signal<string | null>(null);

  loading = signal(true);
  data    = signal<SeasonDashboardResponse[]>([]);

  warnings = computed(() =>
    this.data().filter(d => d.warning).map(d => d.warning)
  );

  totalPlantings = computed(() =>
    this.data().reduce((acc, d) => acc + d.totalPlantings, 0)
  );

  totalArea = computed(() =>
    this.data().reduce((acc, d) => acc + d.totalArea, 0)
  );

  totalProducedKg = computed(() =>
    this.data().reduce((acc, d) => acc + d.totalProducedKg, 0)
  );

  avgProductivity = computed(() => {
    const items = this.data().filter(d => d.avgProductivity > 0);
    if (!items.length) return 0;
    return items.reduce((acc, d) => acc + d.avgProductivity, 0) / items.length;
  });

  barChartOption = computed<EChartsOption>(() => {
    const items = this.data();
    if (!items.length) return {};

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#171717',
        borderColor: '#22c55e',
        borderWidth: 2,
        padding: [10, 16],
        textStyle: { color: '#22c55e', fontSize: 14 },
        formatter: (params: unknown) => {
          const p = (Array.isArray(params) ? params[0] : params) as { name: string; value: number };
          return `<b>${p.name}</b><br/>Produção: <span style="color:#22c55e">${p.value.toLocaleString('pt-BR')} kg</span>`;
        }
      },
      grid: { left: '2%', right: '4%', bottom: '5%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: items.map(d => d.cropName),
        axisLabel: { color: '#FF9800', fontSize: 13, fontWeight: 'bold' },
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
      series: [{
        type: 'bar',
        data: items.map(d => d.totalProducedKg),
        barMaxWidth: 60,
        itemStyle: {
          color: '#22c55e',
          borderRadius: [8, 8, 0, 0],
        },
      }]
    };
  });

  donutChartOption = computed<EChartsOption>(() => {
    const items = this.data();
    if (!items.length) return {};

    const colors = ['#22c55e', '#FF9800', '#3b82f6', '#a855f7', '#f43f5e', '#14b8a6'];

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
        textStyle: { 
          color: '#4CAF50',             
          fontSize: 18,                 
          fontFamily: 'Arial, sans-serif', 
          fontWeight: 'bold',           
          fontStyle: 'normal'          
        },
      },
      series: [{
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['50%', '45%'],
        data: items.map((d, i) => ({
          name: d.cropName,
          value: d.totalArea,
          itemStyle: { color: colors[i % colors.length] }
        })),
        label: { show: false },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(34,197,94,0.4)' }
        }
      }]
    } as EChartsOption;
  });

  ngOnInit(): void {
    const snap = this.route.snapshot;
    const propertyId = snap.paramMap.get('propertyId') ?? '';
    const seasonId   = snap.queryParamMap.get('seasonId') ?? null;

    this.propertyId.set(propertyId);
    this.propertyName.set(snap.queryParamMap.get('propertyName') ?? 'Propriedade');
    this.seasonId.set(seasonId);

    const req$ = seasonId
      ? this.service.getDashboardBySeason(seasonId)
      : this.service.getDashboard(propertyId);

    req$.subscribe({
      next:  data => { this.data.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }
}
