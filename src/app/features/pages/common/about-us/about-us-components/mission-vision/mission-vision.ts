import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_ABOUT_US } from '../../../../../../core/ui/icons/icons-about-us/icons.about-us';
import { CardPages } from "../../../../../../shared/components/cards/card-pages/card-pages";
@Component({
  selector: 'app-mission-vision',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CardPages],
  templateUrl: './mission-vision.html'
})
export class MissionVision {
  icons = ICONS_ABOUT_US;
  mission = input.required<string>();
  vision = input.required<string>();
}
