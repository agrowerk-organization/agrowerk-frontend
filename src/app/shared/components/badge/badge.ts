import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BadgeIndex } from '../../../core/ui/badge/badge';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './badge.html'
})
export class Badge {
  @Input() badge!: BadgeIndex;

  get showIcon(): IconDefinition {
    return this.badge.icon;
  }
}
