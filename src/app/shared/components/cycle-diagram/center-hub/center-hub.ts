import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-center-hub',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './center-hub.html',
})
export class CenterHub {
  rearrange = output<void>();
}
