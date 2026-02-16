import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Content } from '../../../core/ui/types/generic/content.initial-cta';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './actions.html',
})
export class Actions {
  actions = input.required<Content[]>();
  width = input.required<string>();
  mobileWidth = input.required<string>();
}
