import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './stat-card.html'
})

export class StatCard {

  label = input.required<string>();
  value = input.required<string>();
  icon = input.required<IconDefinition>();

}
