import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '@core/services/property.service';
import { PropertyResponse } from '@core/types/property/property.response';
import { PropertyUpdateModal } from '../property-update-modal/property-update-modal';
import { PropertyHeader } from './components/property-header/property-header';
import { PropertyHero } from './components/property-hero/property-hero';
import { PropertyAreas } from './components/property-areas/property-areas';
import { PropertyAddress } from './components/property-address/property-address';
import { PropertyRecords } from './components/property-records/property-records';
import { BackButton } from "@shared/components/back-button/back-button";
import { ButtonPages } from "@shared/components/buttons/button-pages/button-pages";
import { ICONS_PROPERTY } from "@core/ui/icons/icons-producer/icons-property/icons-property";
@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule,
    PropertyUpdateModal,
    PropertyHeader,
    PropertyHero,
    PropertyAreas,
    PropertyAddress,
    PropertyRecords,
    BackButton,
    ButtonPages
],
  templateUrl: './property-detail.html',
})
export class PropertyDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private propertyService = inject(PropertyService);

  property = signal<PropertyResponse | null>(null);
  loading = signal(true);
  uploading = signal(false);
  showModal = signal(false);
  avatarPreview = signal<string | null>(null);

  readonly icons = ICONS_PROPERTY;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/producer/properties']); return; }

    this.propertyService.findPropertyById(id).subscribe({
      next: p => { this.property.set(p); this.loading.set(false); },
      error: () => { this.loading.set(false); this.router.navigate(['/producer/properties']); }
    });
  }

  onUpdated(updated: PropertyResponse) {
    this.property.set(updated);
    this.showModal.set(false);
  }

  onFileSelected(file: File): void {
    this.avatarPreview.set(URL.createObjectURL(file));
    this.uploading.set(true);

    this.propertyService.uploadPhoto(this.property()!.id, file).subscribe({
      next: res => {
        this.property.update(p => p ? { ...p, avatarUrl: res.originalUrl } : p);
        this.avatarPreview.set(null);
        this.uploading.set(false);
      },
      error: () => { this.avatarPreview.set(null); this.uploading.set(false); }
    });
  }

  goToFields(propertyId: string, propertyName: string): void {
    this.router.navigate(['/producer/fields', propertyId], {
      queryParams: { propertyName }
    });
  }
}