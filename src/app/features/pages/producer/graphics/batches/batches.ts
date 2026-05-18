import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption }     from 'echarts';
import { forkJoin }          from 'rxjs';
import { AgriculturalPracticeService }  from '@core/services/agricultural-practice.service';
import { AgronomicPrescriptionService } from '@core/services/agronomic-prescription.service';
import { AgriculturalPracticeResponse } from '@core/types/agricultural-practice/agricultural-pratice.response';
import { PrescriptionResponse }         from '@core/types/prescription/prescription.response';
import { PracticeTypeDesc, PracticeType } from '@core/enums/agricultural-practice-type';
import { BackButton } from '@shared/components/back-button/back-button';
import { ICONS_AGRICULTURAL_PRACTICES } from '@core/ui/icons/icons-producer/icons-agricultural-practices/icons-agricultural-practices';

@Component({
  selector: 'app-batches',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, NgxEchartsModule, BackButton],
  providers: [{
    provide: NGX_ECHARTS_CONFIG,
    useValue: { echarts: () => import('echarts') }
  }],
  templateUrl: './batches.html',
})
export class Batches implements OnInit {
  private readonly route               = inject(ActivatedRoute);
  private readonly practiceService     = inject(AgriculturalPracticeService);
  private readonly prescriptionService = inject(AgronomicPrescriptionService);

  readonly icons = ICONS_AGRICULTURAL_PRACTICES;
  readonly backLink = '/producer/dashboard';
  
  propertyId   = signal<string>('');
  propertyName = signal<string>('');
  plantingId   = signal<string>('');
  loading      = signal(true);

  practices     = signal<AgriculturalPracticeResponse[]>([]);
  prescriptions = signal<PrescriptionResponse[]>([]);
  totalCost     = signal<number>(0);

  totalActivities  = computed(() => this.practices().length);
  expiringCount    = computed(() => this.prescriptions().length);
  expiredCount     = computed(() =>
    this.prescriptions().filter(p => p.expired).length
  );

  byTypeCounts = computed(() => {
    const map: Record<string, number> = {};
    for (const p of this.practices()) {
      map[p.practipeType] = (map[p.practipeType] ?? 0) + 1;
    }
    return map;
  });

  byCostCounts = computed(() => {
    const map: Record<string, number> = {};
    for (const p of this.practices()) {
      map[p.practipeType] = (map[p.practipeType] ?? 0) + p.costAmount;
    }
    return map;
  });

  typeChartOption = computed<EChartsOption>(() => {
    const counts = this.byTypeCounts();
    const entries = Object.entries(counts);
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
        formatter: '{b}: {c} atividade(s) ({d}%)'
      },
      legend: {
        bottom: 0,
        textStyle: { color: '#9ca3af', fontSize: 11 },
      },
      series: [{
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['50%', '43%'],
        data: entries.map(([key, val], i) => ({
          name: PracticeTypeDesc[key as PracticeType] ?? key,
          value: val,
          itemStyle: { color: colors[i % colors.length] }
        })),
        label: { show: false },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(34,197,94,0.4)' }
        }
      }]
    };
  });

  costChartOption = computed<EChartsOption>(() => {
    const costs = this.byCostCounts();
    const entries = Object.entries(costs);
    if (!entries.length) return {};

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#171717',
        borderColor: '#22c55e',
        borderWidth: 2,
        textStyle: { color: '#22c55e', fontSize: 14 },
        formatter: (params: unknown) => {
          const p = (Array.isArray(params) ? params[0] : params) as { name: string; value: number };
          return `<b>${p.name}</b><br/>Custo: <span style="color:#22c55e">R$ ${p.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>`;
        }
      },
      grid: { left: '2%', right: '4%', bottom: '5%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: entries.map(([key]) => PracticeTypeDesc[key as PracticeType] ?? key),
        axisLabel: { color: '#FF9800', fontSize: 11, fontWeight: 'bold', rotate: entries.length > 4 ? 15 : 0 },
        axisLine: { show: false }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#4CAF50', fontSize: 12,
          formatter: (v: number) => `R$ ${v.toLocaleString('pt-BR')}`
        },
        splitLine: { lineStyle: { color: 'rgba(0,148,37,0.3)', type: 'dashed' } }
      },
      series: [{
        type: 'bar',
        data: entries.map(([, val]) => val),
        barMaxWidth: 60,
        itemStyle: { color: '#22c55e', borderRadius: [8, 8, 0, 0] }
      }]
    };
  });

  ngOnInit(): void {
    const snap = this.route.snapshot;
    const propertyId = snap.paramMap.get('propertyId') ?? '';
    const plantingId = snap.paramMap.get('plantingId') ?? '';

    this.propertyId.set(propertyId);
    this.plantingId.set(plantingId);
    this.propertyName.set(snap.queryParamMap.get('propertyName') ?? 'Propriedade');

    forkJoin({
      practices:     this.practiceService.findByPlanting(plantingId, 0, 100),
      prescriptions: this.prescriptionService.findNearExpiration(propertyId),
    }).subscribe({
      next: ({ practices, prescriptions }) => {
        this.practices.set(practices.content ?? []);
        this.prescriptions.set(prescriptions);
        this.totalCost.set(
          (practices.content ?? []).reduce((acc, p) => acc + p.costAmount, 0)
        );
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  prescriptionBadge(p: PrescriptionResponse): string {
    if (p.expired)  return 'border-red-500/60 text-red-400 bg-red-500/10';
    return 'border-yellow-500/60 text-yellow-400 bg-yellow-500/10';
  }

}
