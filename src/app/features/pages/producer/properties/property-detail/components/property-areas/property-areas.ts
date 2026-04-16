import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertyResponse } from '@core/types/property/property.response';
@Component({
  selector: 'app-property-areas',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './property-areas.html'
})
export class PropertyAreas {
  property = input.required<PropertyResponse>();
  icons = ICONS_PROPERTY;
}
