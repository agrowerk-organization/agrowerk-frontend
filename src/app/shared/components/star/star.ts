import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star.html',
})
export class Star {

  filled = input<boolean>(true);
  size = input<number>(24);
}
