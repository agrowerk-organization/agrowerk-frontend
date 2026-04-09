import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
import { CepMaskDirective } from "@shared/directives/cep-mask.directive";
import { NumberField } from '@shared/components/number-field/number-field';
import { ToggleField } from '@shared/components/toggle-field/toggle-field';
@Component({
  selector: 'app-step-address',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FontAwesomeModule, 
    CepMaskDirective,
    NumberField,
    ToggleField
  ],
  templateUrl: './step-address.html',
})
export class StepAddress {
  form = input.required<FormGroup>();

  icons = ICONS_PROPERTY;

  toggleRural() {
    this.form().patchValue({ rural: !this.form().value.rural });
  }
}
