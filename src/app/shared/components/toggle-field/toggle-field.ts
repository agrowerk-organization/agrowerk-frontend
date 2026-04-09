import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toggle-field',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './toggle-field.html',
})
export class ToggleField {
  label    = input.required<string>();
  value    = input<boolean>(false);
  disabled = input<boolean>(false);
  toggled  = output<boolean>();

  icons = { TOGGLE_ON: faToggleOn, TOGGLE_OFF: faToggleOff };

  toggle(): void {
    if (!this.disabled()) this.toggled.emit(!this.value());
  }
}