import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileResponse } from '@core/types/user/user-profile.response';
import { ICONS_USER_PROFILE } from '@core/ui/icons/icons-producer/icons-profile/icons-profile';

@Component({
  selector: 'app-profile-personal-data',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './profile-personal-data.html',
})
export class ProfilePersonalData {
  profile = input.required<UserProfileResponse>();

  icons = ICONS_USER_PROFILE;
}