import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.html'
})
export class Title {
  firstSegment = input<string>('');
  secondSegment = input<string>(''); 
}
