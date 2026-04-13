import { Component, input, output, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './avatar-upload.html',
})
export class AvatarUpload {
  avatarUrl    = input<string | null>(null);
  avatarPreview = input<string | null>(null);
  name         = input<string>('');
  uploading    = input<boolean>(false);

  fileSelected = output<File>();

  @ViewChild('avatarInput') avatarInput!: ElementRef<HTMLInputElement>;

  icons = { CAMERA: faCamera, SPINNER: faSpinner };

  avatarSrc = computed(() => this.avatarPreview() ?? this.avatarUrl() ?? null);

  initials = computed(() =>
    this.name().split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
  );

  triggerInput(): void {
    this.avatarInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.fileSelected.emit(file);
  }
}