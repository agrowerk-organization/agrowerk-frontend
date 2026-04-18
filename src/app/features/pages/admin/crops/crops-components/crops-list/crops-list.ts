import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CropResponse } from '@core/types/crop/crop.response';
import { CropCard } from '../crop-card/crop-card';
import { ICONS_ADMIN_CROPS } from '@core/ui/icons/icons-admin/icons-admin-crops/icons-admin-crops';

@Component({
  selector: 'app-crops-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CropCard],
  templateUrl: './crops-list.html'
})
export class CropsList {
  crops = input.required<CropResponse[]>();
  loading = input.required<boolean>();
  totalElements = input.required<number>();
  currentPage = input.required<number>();
  totalPages = input.required<number>();

  pageChange = output<number>();
  editCrop = output<CropResponse>();

  readonly icons = ICONS_ADMIN_CROPS;

  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i);
  }

  categoryLabel(value: string): string {
    return value; 
  }
}
