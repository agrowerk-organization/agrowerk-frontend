import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
@Component({
  selector: 'app-step-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './step-address.html',
})
export class StepAddress {
  form = input.required<FormGroup>();

  icons = ICONS_PROPERTY;

  toggleRural() {
    this.form().patchValue({ rural: !this.form().value.rural });
  }
}
