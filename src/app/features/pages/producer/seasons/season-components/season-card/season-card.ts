import { Component, inject, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeasonResponse } from '@core/types/season/season-response';
import { SeasonStatus, SeasonStatusDesc, SeasonStatusColor } from '@core/enums/season-status';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_PRODUCER_SEASONS } from '@core/ui/icons/icons-producer/icons-seasons/icons-seasons';

@Component({
  selector: 'app-season-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    ButtonPages],
  templateUrl: './season-card.html',
})
export class SeasonCard {
  private router = inject(Router);
  season   = input.required<SeasonResponse>();
  propertyId = input.required<string>();
  propertyName = input.required<string>();
  activate = output<SeasonResponse>();
  toFinish   = output<SeasonResponse>();

  readonly icons = ICONS_PRODUCER_SEASONS;

  statusLabel = computed(() =>
    SeasonStatusDesc[this.season().seasonStatus as SeasonStatus] ?? this.season().seasonStatus
  );

  statusColor = computed(() =>
    SeasonStatusColor[this.season().seasonStatus as SeasonStatus] ?? 'text-primary border-primary'
  );

  canActivate = computed(() => this.season().seasonStatus === SeasonStatus.PLANNED);
  canFinish   = computed(() => this.season().seasonStatus === SeasonStatus.IN_PROGRESS);

  goToFields(): void {
    this.router.navigate([`/producer/properties/${this.propertyId()}/fields`],
    { queryParams: { propertyName: this.propertyName(), seasonName: this.season().name } } );
  }
}