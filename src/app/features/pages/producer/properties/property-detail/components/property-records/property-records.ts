import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertyResponse } from '@core/types/property/property.response';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
@Component({
  selector: 'app-property-records',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './property-records.html'
})
export class PropertyRecords {
  property = input.required<PropertyResponse>();
  icons = ICONS_PROPERTY;
}
