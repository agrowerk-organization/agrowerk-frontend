import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  main = input.required<string>();
  pageName = input.required<string>();
}
