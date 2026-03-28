import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ICONS_PROPERTY } from '@core/ui/icons/icons-producer/icons-property/icons-property';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-step-photo',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './step-photo.html'
})
export class StepPhoto {
  previewUrl = input<string | null>(null);
  hasFile = input<boolean>(false);
  uploading = input<boolean>(false);

  fileSelected = output<File | null>();
  upload = output<void>();
  skip = output<void>();

  icons = ICONS_PROPERTY;
}
