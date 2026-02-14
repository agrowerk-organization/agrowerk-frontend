import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './button.html',
  styleUrls: ['./button.css']
})
export class Button {
  variant = input<'primary' | 'secondary' | 'outline'>('outline');
  icon = input<IconDefinition | undefined>(undefined);
  disabled = input<boolean>(false);
  clickeEffect = output<void>();


  handleAction() {
    if (!this.disabled()) {
      this.clickeEffect.emit();
    }
  }
}
