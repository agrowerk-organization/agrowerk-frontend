import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-role-tab-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './role-tab-button.html'
})
export class RoleTabButton {
  label = input<string>();
  icon = input.required<IconDefinition>();
  activeRole = input<boolean>(false);
  clicked = output<void>();

}
