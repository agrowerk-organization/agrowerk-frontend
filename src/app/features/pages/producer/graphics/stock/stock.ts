import {
  Component, OnInit, inject, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption }     from 'echarts';
import { forkJoin }          from 'rxjs';
import { StockPositionService } from '@core/services/stock-position.service';
import { StockMovementService }     from '@core/services/stock-movement.service';
import { BatchExpirationService }   from '@core/services/batch-expiration.service';
import { StockPositionResponse }    from '@core/types/stock/stock-position.response';
import { StockMovementResponse }    from '@core/types/stock/stock-movement.response';
import { BatchExpirationResponse }  from '@core/types/batch/batch-expiration.response';
import { BackButton }  from '@shared/components/back-button/back-button';
import { ICONS_PLANTINGS } from '@core/ui/icons/icons-producer/icons-plantings/icons-plantings';

@Component({
  selector: 'app-stock',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule, NgxEchartsModule, BackButton],
  providers: [{
    provide: NGX_ECHARTS_CONFIG,
    useValue: { echarts: () => import('echarts') }
  }],
  templateUrl: './stock.html',
})
export class Stock implements OnInit {
  private readonly route          = inject(ActivatedRoute);
  private readonly positionService  = inject(StockPositionService);
  private readonly movementService  = inject(StockMovementService);
  private readonly expirationService = inject(BatchExpirationService);

  readonly icons = ICONS_PLANTINGS;
  readonly backLink = '/producer/dashboard';
  
  propertyId   = signal<string>('');
  propertyName = signal<string>('');
  loading      = signal(true);

  positions  = signal<StockPositionResponse[]>([]);
  movements  = signal<StockMovementResponse[]>([]);
  criticals  = signal<BatchExpirationResponse[]>([]);

  totalItems    = computed(() => this.positions().length);
  totalValue    = computed(() => this.positions().reduce((acc, p) => acc + p.totalValue, 0));
  alertItems    = computed(() => this.positions().filter(p => p.stockAlert !== 'OK').length);
  criticalCount = computed(() => this.criticals().length);

  positionChartOption = computed<EChartsOption>(() => {
    const items = this.positions().slice(0, 10);
    if (!items.length) return {};
  
    const alertColor = (alert: string) => {
      const status = alert?.toUpperCase();
      if (status === 'CRITICAL') return '#f43f5e';
      if (status === 'LOW' || status === 'BAIXO') return '#FF9800';
      return '#22c55e';
    };
  
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#171717',
        borderColor: '#22c55e',
        borderWidth: 2,
        textStyle: { color: '#22c55e', fontSize: 20 },
      },
      color: ['#22c55e', '#FF9800', '#f43f5e'],
      grid: { left: '2%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: items.map(p => p.inputName),
        axisLabel: {
          color: '#FF9800', fontSize: 14, fontWeight: 'bold',
          rotate: items.length > 5 ? 15 : 0,
        },
        axisLine: { show: false }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#4CAF50', fontSize: 20 },
        splitLine: { lineStyle: { color: 'rgba(0,148,37,0.3)', type: 'dashed', width: 2 } }
      },
      series: [{
        type: 'bar',
        data: items.map(p => ({
          value: p.availableQuantity,
          itemStyle: { 
            color: alertColor(p.stockAlert), 
            borderRadius: [8, 8, 0, 0] 
          }
        })),
        barMaxWidth: 50,
        label: {
          show: true, 
          position: 'top',
          color: '#ffffff', 
          fontSize: 20,
          formatter: (params: { value: number | string }) => `${params.value}`
        }
      }]
    } as EChartsOption;
  });
  
  movementChartOption = computed<EChartsOption>(() => {
    const items = this.movements().slice(0, 20).reverse();
    if (!items.length) return {};
  
    const entries = items.map(m => m.movementType === 'ENTRY' ? m.quantity : 0);
    const exits   = items.map(m => m.movementType === 'EXIT'  ? m.quantity : 0);
    const dates   = items.map(m => m.movementDate.slice(0, 10));
  
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#171717',
        borderColor: '#22c55e',
        borderWidth: 2,
        textStyle: { color: '#22c55e', fontSize: 20 },
      },
      legend: {
        data: ['Entradas', 'Saídas'],
        textStyle: { color: '#9ca3af', fontSize: 20, fontWeight: 'bold' },
        bottom: 0,
      },
      grid: { left: '2%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category', data: dates, boundaryGap: false,
        axisLabel: {
          color: '#FF9800', fontSize: 20, fontWeight: 'bold',
        },
        axisLine: { show: false }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#4CAF50', fontSize: 20 },
        splitLine: { lineStyle: { color: 'rgba(0,148,37,0.3)', type: 'dashed', width: 2 } }
      },
      series: [
        {
          name: 'Entradas', type: 'line', data: entries, smooth: 0.4,
          lineStyle: { color: '#22c55e', width: 2 },
          itemStyle: { color: '#22c55e' },
          areaStyle: { color: 'rgba(34,197,94,0.1)' }
        },
        {
          name: 'Saídas', type: 'line', data: exits, smooth: 0.4,
          lineStyle: { color: '#f43f5e', width: 2 },
          itemStyle: { color: '#f43f5e' },
          areaStyle: { color: 'rgba(244,63,94,0.1)' }
        }
      ]
    };
  });

  ngOnInit(): void {
    const snap = this.route.snapshot;
    const propertyId = snap.paramMap.get('propertyId') ?? '';
    this.propertyId.set(propertyId);
    this.propertyName.set(snap.queryParamMap.get('propertyName') ?? 'Propriedade');

    forkJoin({
      positions: this.positionService.getPositions(propertyId),
      movements: this.movementService.getMovements(propertyId, 0, 20),
      criticals: this.expirationService.getCriticalBatches(propertyId),
    }).subscribe({
      next: ({ positions, movements, criticals }) => {
        this.positions.set(positions);
        this.movements.set(movements.content ?? []);
        this.criticals.set(criticals);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  expirationBadge(status: string): string {
    if (status === 'CRITICAL') return 'border-red-500/60 text-red-400 bg-red-500/10';
    if (status === 'WARNING')  return 'border-yellow-500/60 text-yellow-400 bg-yellow-500/10';
    return 'border-primary/40 text-primary bg-primary/10';
  }

  alertBadge(alert: string): string {
    if (alert === 'CRITICAL') return 'border-red-500/60 text-red-400';
    if (alert === 'LOW')      return 'border-yellow-500/60 text-yellow-400';
    return 'border-primary/40 text-primary';
  }

}
