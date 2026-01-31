import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtitle.html',
})
export class Subtitle {
  text = input<string>('');
}
