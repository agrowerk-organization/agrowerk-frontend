import {
  Component, input, output, signal, inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';  
import { SeasonService } from '@core/services/season.service';
import { SeasonResponse } from '@core/types/season/season-response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_PRODUCER_SEASONS } from '@core/ui/icons/icons-producer/icons-seasons/icons-seasons';
@Component({
  selector: 'app-season-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FontAwesomeModule, 
    ButtonPages
  ],
  templateUrl: './season-form.html',
})
export class SeasonForm {
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(SeasonService);

  propertyId = input.required<string>();
  saved      = output<SeasonResponse>();
  toCancel   = output<void>();

  saving = signal(false);

  readonly icons = ICONS_PRODUCER_SEASONS;

  form = this.fb.group({
    name:      ['', [Validators.required]],
    startDate: ['', Validators.required],
    endDate:   ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    const v = this.form.getRawValue();

    this.service.createSeason({
      propertyId: this.propertyId(),
      name:       v.name!,
      startDate:  v.startDate!,
      endDate:    v.endDate!,
    }).subscribe({
      next:  res => { this.saving.set(false); this.saved.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}