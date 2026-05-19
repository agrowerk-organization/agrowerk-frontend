import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';

@Component({
  selector: 'app-property-header',
  standalone: true,
  imports: [FontAwesomeModule, ButtonPages],
  templateUrl: './property-header.html',
})
export class PropertyHeader {
  name = input.required<string>();
  stateName = input.required<string>();
  edit = output<void>();
  icons = ICONS_PROPERTY;
}