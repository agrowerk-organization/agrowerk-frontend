import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './loading-state.html'
})
export class LoadingState {
  loadingIcon = input.required<IconDefinition>();
  message = input.required<string>();
}
