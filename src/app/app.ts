import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from "./core/layouts/main-layout/main-layout.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('agrowerk-frontend');
}
