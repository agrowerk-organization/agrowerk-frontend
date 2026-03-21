import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Content } from '@core/ui/types/generic/content.initial-cta';

@Component({
  selector: 'app-trust',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './trust.html'
})
export class Trust {
  @Input() trusts!: Content[];
}
