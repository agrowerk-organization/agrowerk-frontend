import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangeDetectionStrategy } from '@angular/core';
import { ICONS_DASHBOARD } from '@core/ui/icons/icons-producer/icons-dashboard/icons-dashboard';
import { SeasonResponse } from '@core/types/season/season-response';
import { ButtonPages } from "@shared/components/buttons/button-pages/button-pages";
@Component({
  selector: 'app-season-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './season-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonCard {
  private router = inject(Router);

  season = input<SeasonResponse | null>(null);
  icons = ICONS_DASHBOARD;

  hasSeason = computed(() => this.season() !== null);

  addHarvest() {
    return
  }

  report() {
    return
  }
  createSeason() {
    return
  } 

  goToSeason() {
    this.router.navigate([`/producer/season/${this.season()?.id}`]);
  }
}
