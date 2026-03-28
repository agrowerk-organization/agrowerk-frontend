import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertyResponse } from '@core/types/property/property.response';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './property-card.html',
})
export class PropertyCard {

  property = input.required<PropertyResponse>();
  edit = output<PropertyResponse>();

  icons = ICONS_PROPERTY;

}
