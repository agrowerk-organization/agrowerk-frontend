import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-step-units',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './step-units.html',
})
export class StepUnits {
  units = input.required<FormArray>();

  readonly icons = ICONS_PROPERTY;

  addUnit() {
    this.units().push(new FormGroup({
      name:         new FormControl('', Validators.required),
      area:         new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
      rural:        new FormControl(false),
      code:         new FormControl('', Validators.required),
      municipality: new FormControl('', Validators.required),
      locationName: new FormControl(''),
      street:       new FormControl(''),
      number:       new FormControl<number | null>(null),
      neighborhood: new FormControl(''),
      landmark:     new FormControl(''),
    }));
  }

  removeUnit(i: number) { this.units().removeAt(i); }

  group(i: number): FormGroup { return this.units().at(i) as FormGroup; }

  toggleRural(i: number) {
    const g = this.group(i);
    g.patchValue({ rural: !g.value.rural });
  }
}