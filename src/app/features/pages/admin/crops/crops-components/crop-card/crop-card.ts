import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CropResponse } from '@core/types/crop/crop.response';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_ADMIN_CROPS } from '@core/ui/icons/icons-admin/icons-admin-crops/icons-admin-crops';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';

@Component({
  selector: 'app-crop-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './crop-card.html'
})
export class CropCard {
  crop = input.required<CropResponse>();
  categoryLabel = input.required<string>();
  edit = output<CropResponse>();
  readonly icons = ICONS_ADMIN_CROPS;
}
