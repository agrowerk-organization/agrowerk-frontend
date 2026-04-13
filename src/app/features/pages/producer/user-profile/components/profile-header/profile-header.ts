import { Component, input, output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileResponse } from '@core/types/user/user-profile.response';
import { ICONS_USER_PROFILE } from '@core/ui/icons/icons-producer/icons-profile/icons-profile';
import { AvatarUpload } from '@shared/components/avatar-upload/avatar-upload';
@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, AvatarUpload],
  templateUrl: './profile-header.html'
})
export class ProfileHeader {
  profile       = input.required<UserProfileResponse>();
  uploading     = input<boolean>(false);
  avatarPreview = input<string | null>(null);

  fileSelected = output<File>();

  @ViewChild('avatarInput') avatarInput!: ElementRef<HTMLInputElement>;

  icons = ICONS_USER_PROFILE;

}