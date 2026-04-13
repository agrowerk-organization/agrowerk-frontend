import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertyService } from '@core/services/property.service';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
import { PropertyResponse } from '@core/types/property/property.response';
import { PropertyUpdateModal } from '../property-update-modal/property-update-modal';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { AvatarUpload } from '@shared/components/avatar-upload/avatar-upload';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    PropertyUpdateModal,
    ButtonPages,
    AvatarUpload
  ],
  templateUrl: './property-detail.html',
})
export class PropertyDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private propertyService = inject(PropertyService);

  icons = ICONS_PROPERTY;

  property = signal<PropertyResponse | null>(null);
  loading = signal(true);
  uploading = signal(false);
  showModal = signal(false);
  avatarPreview = signal<string | null>(null);

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

  onFileSelected(file: File): void {
    const preview = URL.createObjectURL(file);
    this.avatarPreview.set(preview);
    this.uploading.set(true);

    this.propertyService.uploadPhoto(this.property()!.id, file).subscribe({
      next: res => {
        this.property.update(p => p ? { ...p, avatarUrl: res.originalUrl } : p);
        this.avatarPreview.set(null);
        this.uploading.set(false);
      },
      error: () => {
        this.avatarPreview.set(null);
        this.uploading.set(false);
      }
    });
  }
}
