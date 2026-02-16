import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  icon = input.required<IconDefinition>();
  main = input.required<string>();
  pageName = input.required<string>();
  subPageName = input.required<string>();
}
