import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-pages',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './card-pages.html'
})
export class CardPages {
  icons = input.required<IconDefinition>();
  title = input.required<string>();
  description = input.required<string>();
}
