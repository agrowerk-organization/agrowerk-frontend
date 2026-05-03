import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { BrazilRegion, BrazilRegionDesc } from '@core/enums/brazil-region';
import { CropVarietyResponse } from '@core/types/crop-variety/crop-variety.response';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { ICONS_CROP_VARIETIES } from '@core/ui/icons/icons-producer/icons-crop-varieties/icons-crop-varieties';

@Component({
  selector: 'app-crop-variety-card',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ButtonPages
  ],
  templateUrl: './crop-variety-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CropVarietyCard {
  variety = input.required<CropVarietyResponse>();
  edit = output<CropVarietyResponse>();
  planting = output<CropVarietyResponse>();

  readonly icons = ICONS_CROP_VARIETIES;

  regionLabel = computed(() =>
    BrazilRegionDesc[this.variety().region as BrazilRegion] ?? this.variety().region
  );

}
