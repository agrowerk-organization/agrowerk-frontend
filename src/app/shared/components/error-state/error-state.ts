import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './error-state.html',
})
export class ErrorState {
  errorIcon = input.required<IconDefinition>();
  title = input<string>('Erro ao carregar');
  message = input<string>('Ocorreu um erro ao carregar a página');
  retryText = input<string>('Tentar novamente');
  retryingText = input<string>('Tentando...');
  retrying = input<boolean>(false);

  retry = output<void>();

}
