import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { AuthSocial } from '@core/ui/types/auth-social/auth-social';

@Component({
  selector: 'app-auth-social-form',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './auth-social-form.html'
})
export class AuthSocialForm {

  authSocialWays = input.required<AuthSocial[]>()

}
