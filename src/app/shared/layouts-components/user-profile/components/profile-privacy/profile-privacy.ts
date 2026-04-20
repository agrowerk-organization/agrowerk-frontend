import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileResponse } from '@core/types/user/user-profile.response';
import { ICONS_USER_PROFILE } from '@core/ui/icons/icons-producer/icons-profile/icons-profile';
@Component({
  selector: 'app-profile-privacy',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile-privacy.html'
})
export class ProfilePrivacy {
  profile = input.required<UserProfileResponse>();

  icons = ICONS_USER_PROFILE;
}
