import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_STATISTICS_HOME } from '../../../../../../../../core/ui/icons/icons-home/icons.statistics-home';

@Component({
  selector: 'app-stat-trend',
  standalone: true, 
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './stat-trend.html',
  styleUrl: './stat-trend.css',
})
export class StatTrend {
  trend = input.required<{ label: string | undefined, value: string | undefined}>();
  icon = ICONS_STATISTICS_HOME.ARROW_TREND_UP;
}
