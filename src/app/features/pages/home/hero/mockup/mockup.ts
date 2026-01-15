import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mockup',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './mockup.html',
  styleUrl: './mockup.css',
})
export class Mockup {

}
