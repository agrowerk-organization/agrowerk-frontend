import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Content } from '../../../../../../core/ui/initial-cta/content.initial-cta';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './actions.html',
})
export class Actions {
  @Input() actions!: Content[];
}
