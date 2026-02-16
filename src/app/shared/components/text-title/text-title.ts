import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-title.html',
})
export class TextTitle {
  title = input.required<string>(); 
  subtitle = input.required<string>();
}
