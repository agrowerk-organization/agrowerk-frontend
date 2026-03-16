import { CommonModule } from '@angular/common';
import { Component, input, computed } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Counter } from '../counter/counter';
import { StatisticsHome } from '../../../../../../../core/ui/types/statistics-home/statistics-home';
import { StatTrend } from '../stat-trend/stat-trend';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, Counter, StatTrend],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  stat = input.required<StatisticsHome>();
  index = input.required<number>();

  iconContainerClass = computed(() => 
    `w-16 h-16 rounded-full flex items-center justify-center bg-${this.stat().color}/20`
  );
}
