import { Component, inject, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherAlertService } from '@core/services/weather-alert.service';
import { ICONS_WEATHER } from '@core/ui/icons/icons-producer/icons-weather/icons-weather';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
@Component({
  selector: 'app-resolve-alert-modal',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonPages, FontAwesomeModule],
  templateUrl: './resolve-alert-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResolveAlertModal {
  readonly alertId    = input.required<string>();
  readonly alertTitle = input.required<string>();
  readonly toCancel   = output<void>();
  readonly toResolved = output<void>();

  readonly saving = signal(false);
  readonly observationsControl = new FormControl<string>('');

  protected readonly icons = ICONS_WEATHER;

  private readonly weatherAlertService = inject(WeatherAlertService);

  submit(): void {
    this.saving.set(true);
    this.weatherAlertService.resolve(this.alertId(), this.observationsControl.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.toResolved.emit();
      },
      error: () => {
        this.saving.set(false);
      },
    });
  }
}
