import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { ButtonSize } from '@core/ui/types/button/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button-pages',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './button-pages.html',
})
export class ButtonPages {
  readonly icon = input.required<IconDefinition>();
  readonly text = input.required<string>();
  readonly action = output<void>();
  readonly width = input<string>();
  readonly disabled = input<boolean>(false);
  readonly active = input<boolean>(false);
  readonly size = input<ButtonSize>('md');

  readonly sizeClasses = computed(() =>
    this.size() === 'sm'
      ? 'py-2 px-4 text-base rounded-xl gap-2'
      : 'py-4 px-6 text-2xl rounded-2xl gap-3');

  readonly iconSizeClass = computed(() =>
    this.size() === 'sm' ? 'text-base' : 'text-2xl'
  );

  onClick(): void {
    if (!this.disabled()) this.action.emit();
  }
  
}
