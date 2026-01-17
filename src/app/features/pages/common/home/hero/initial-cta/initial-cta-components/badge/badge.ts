import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeIndex } from '../../../../../../../../core/ui/types/badge/badge';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './badge.html'
})
export class Badge {
  @Input() badges!: BadgeIndex[];
}
