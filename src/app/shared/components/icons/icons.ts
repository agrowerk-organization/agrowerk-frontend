import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './icons.html'
})
export class Icons {
  icon = input.required<IconDefinition>();
  label = input.required<string>();
  description = input<string>();
  sublabel = input<string>();
}
