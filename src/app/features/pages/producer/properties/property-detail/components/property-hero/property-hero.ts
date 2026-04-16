import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { PropertyResponse } from '@core/types/property/property.response';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AvatarUpload } from '@shared/components/avatar-upload/avatar-upload';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
@Component({
  selector: 'app-property-hero',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, AvatarUpload],
  templateUrl: './property-hero.html'
})
export class PropertyHero {
  property = input.required<PropertyResponse>();
  avatarPreview = input.required<string | null>(); 
  uploading = input.required<boolean>();
  fileSelected = output<File>();
  icons = ICONS_PROPERTY;
}
