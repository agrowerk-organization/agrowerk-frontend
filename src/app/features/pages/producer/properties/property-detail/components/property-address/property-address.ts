import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { PropertyResponse } from '@core/types/property/property.response';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
@Component({
  selector: 'app-property-address',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './property-address.html'
})
export class PropertyAddress {
  property = input.required<PropertyResponse>();
  icons = ICONS_PROPERTY;
}
