import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './toast.html'
})
export class ToastComponent {

  toastService = inject(ToastService);

  readonly icons = {
    SUCCESS: faCircleCheck,
    ERROR:   faCircleXmark,
    CLOSE:   faXmark,
  };
}