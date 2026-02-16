import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import  { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_STATISTICS_HOME } from '../../../../../core/ui/icons/icons-home/icons.statistics-home';
import { StatisticsHome } from '../../../../../core/ui/types/statistics-home/statistics-home';
import { Card } from './statistics/statistics-components/card/card';
import { Title } from "../../../../../shared/components/title/title";
import { Subtitle } from "../../../../../shared/components/subtitle/subtitle";
import { Carousel } from '../../../../../shared/components/carousel/carousel';
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    Card, 
    Title, 
    Subtitle,
    Carousel
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit{

  private breakpoint = inject(BreakpointObserver);  

  icons = ICONS_STATISTICS_HOME;

  isMobile = signal(false);

  ngOnInit(): void {
    this.breakpoint.observe(Breakpoints.Handset).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }

  statistics: StatisticsHome[] = [
    {
      id: 1,
      label: 'Produtores Ativos',
      value: 500,
      suffix: '+',
      icon: this.icons.USERS,
      color: 'primary',
      trend: {
        value: '+15%',
        label: 'este mês'
      }
    },
    {
      id: 2,
      label: 'Hectares Gerenciados',
      value: 15000,
      suffix: '+',
      icon: this.icons.CHART_AREA,
      color: 'success',
      trend: {
        value: '+47%',
        label: 'este mês'
      }
    },
    {
      id: 3,
      label: 'Toneladas Negociadas',
      value: 3500,
      suffix: '',
      icon: this.icons.BOXES,
      color: 'quartenary',
      trend: {
        value: '+9%',
        label: 'este mês'
      }
    },
    {
      id: 4,
      label: 'Negociados em Barter',
      value: 2.5,
      prefix: 'R$ ',
      suffix: 'M',
      icon: this.icons.COINS,
      color: 'secondary',
      trend: {
        value: '+22%',
        label: 'este mês'
      }
    }
  ];
}
