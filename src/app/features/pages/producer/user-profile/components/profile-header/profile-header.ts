import { Component, input, output, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileResponse } from '@core/types/user/user-profile.response';
import { ICONS_USER_PROFILE } from '@core/ui/icons/icons-producer/icons-profile/icons-profile';
@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile-header.html'
})
export class ProfileHeader {
  profile       = input.required<UserProfileResponse>();
  uploading     = input<boolean>(false);
  avatarPreview = input<string | null>(null);

  fileSelected = output<File>();

  @ViewChild('avatarInput') avatarInput!: ElementRef<HTMLInputElement>;

  icons = ICONS_USER_PROFILE;

  initials = computed(() => {
    const name = this.profile()?.name ?? '';
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  });

  avatarSrc = computed(() => this.avatarPreview() ?? this.profile()?.avatarUrl ?? null);

  triggerInput(): void {
    this.avatarInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.fileSelected.emit(file);
  }
}