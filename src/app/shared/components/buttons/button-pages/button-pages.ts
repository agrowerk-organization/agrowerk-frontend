import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button-pages',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './button-pages.html',
})
export class ButtonPages {
  icon = input.required<IconDefinition>();
  text = input.required<string>();
  action = input.required<() => void>();
  width = input<string>();
}
