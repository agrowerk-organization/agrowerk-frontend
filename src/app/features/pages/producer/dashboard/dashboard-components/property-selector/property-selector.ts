import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { computed, input, output } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { PropertyResponse } from '../../../../../../core/types/property/property.response';
@Component({
  selector: 'app-property-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertySelector {
  properties = input.required<PropertyResponse[]>();
  activePropertyId = input.required<string>();
  propertyChange = output<string>();

  showSelector = computed(() => this.properties().length > 1);

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.propertyChange.emit(value);
  }
}