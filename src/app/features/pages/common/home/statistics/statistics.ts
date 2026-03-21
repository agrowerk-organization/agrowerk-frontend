import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_STATISTICS_HOME } from '@core/ui/icons/icons-common/icons-home/icons.statistics-home';
import { StatisticsHome } from '@core/ui/types/statistics-home/statistics-home';
import { Card } from './statistics-components/card/card';
import { Title } from "@shared/components/title/title";
import { Subtitle } from "@shared/components/subtitle/subtitle";
import { Carousel } from '@shared/components/carousel/carousel';
import STATISTICS_DATA from '@assets/files/home/statistics.json';

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
export class Statistics implements OnInit {

  private breakpoint = inject(BreakpointObserver);

  icons = ICONS_STATISTICS_HOME;

  isMobile = signal(false);

  ngOnInit(): void {
    this.breakpoint.observe(Breakpoints.Handset).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }

  statistics: StatisticsHome[] = STATISTICS_DATA.map(stat => ({
    ...stat,
    icon: this.icons[stat.iconKey as keyof typeof ICONS_STATISTICS_HOME]
  }));
}