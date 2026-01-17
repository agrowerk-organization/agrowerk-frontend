import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-button.html',
})
export class FormButton {
  label = input.required<string>();
  loadingLabel = input<string>('Carregando...');
  isLoading = input<boolean>(false);
  disabled = input<boolean>(false);
  type = input<'submit' | 'button' | 'reset'>('submit');
}
