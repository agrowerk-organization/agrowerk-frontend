import {
  Component, input, output, signal,
  inject, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BatchService }         from '@core/services/batch.service';
import { BatchResponse }        from '@core/types/batch/batch.response';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_BARTER } from '@core/ui/icons/icons-producer/icons-barter/icons-barter';

@Component({
  selector: 'app-receive-batch-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FontAwesomeModule, 
    ButtonPages
  ],
  templateUrl: './receive-batch-form.html',
})
export class ReceiveBatchForm {
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(BatchService);

  batch      = input.required<BatchResponse>();
  propertyId = input.required<string>();
  received   = output<BatchResponse>();
  toCancel   = output<void>();

  saving = signal(false);

  readonly icons = ICONS_BARTER;

  form = this.fb.group({
    warehouseId: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);

    this.service.receiveBatch(this.batch().id, {
      propertyId:  this.propertyId(),
      warehouseId: this.form.getRawValue().warehouseId!,
    }).subscribe({
      next:  res => { this.saving.set(false); this.received.emit(res); },
      error: ()  => this.saving.set(false),
    });
  }
}