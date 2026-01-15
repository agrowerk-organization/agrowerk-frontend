import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Content } from '../../../../../../../core/ui/types/initial-cta/content.initial-cta';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './steps.html'
})
export class Steps {
  @Input() steps!: Content[];
}
