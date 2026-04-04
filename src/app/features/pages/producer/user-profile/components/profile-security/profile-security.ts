import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileResponse } from '@core/types/user/user-profile.response';
import { ICONS_USER_PROFILE } from '@core/ui/icons/icons-producer/icons-profile/icons-profile';
@Component({
  selector: 'app-profile-security',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './profile-security.html'
})
export class ProfileSecurity {
  profile = input.required<UserProfileResponse>();

  icons = ICONS_USER_PROFILE;
}
