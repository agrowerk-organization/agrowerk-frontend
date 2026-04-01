import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertyService } from '@core/services/property.service';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
import { PropertyResponse } from '@core/types/property/property.response';
import { PropertyUpdateModal } from '../property-update-modal/property-update-modal';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, PropertyUpdateModal],
  templateUrl: './property-detail.html',
})
export class PropertyDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private propertyService = inject(PropertyService);

  icons = ICONS_PROPERTY;

  property = signal<PropertyResponse | null>(null);
  loading = signal(true);
  showModal = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/producer/properties']);
      return;
    }

    this.propertyService.findPropertyById(id).subscribe({
      next: p => {
        this.property.set(p);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/producer/properties']);
      }
    });
  }

  onUpdated(updated: PropertyResponse) {
    this.property.set(updated);
    this.showModal.set(false);
  }
}
