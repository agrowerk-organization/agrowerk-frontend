import { Component, inject, signal } from '@angular/core';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { ProfileHeader } from './components/profile-header/profile-header';
import { ProfilePersonalData } from './components/profile-personal-data/profile-personal-data';
import { ProfileSecurity } from './components/profile-security/profile-security';
import { ProfilePrivacy } from './components/profile-privacy/profile-privacy';
import { ProfileAccount } from './components/profile-account/profile-account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHeader,
    ProfilePersonalData,
    ProfileSecurity,
    ProfilePrivacy,
    ProfileAccount,
  ],
  templateUrl: './user-profile.html',
})
export class UserProfile {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  profile         = toSignal(this.userService.getProfile(), { initialValue: null });
  uploadingAvatar = signal(false);
  avatarPreview   = signal<string | null>(null);

  onAvatarSelected(file: File): void {
    const reader = new FileReader();
    reader.onload = () => this.avatarPreview.set(reader.result as string);
    reader.readAsDataURL(file);

    this.uploadingAvatar.set(true);
    this.userService.uploadAvatar(file).subscribe({
      next:  (res) => { this.avatarPreview.set(res.thumbnailUrl); this.uploadingAvatar.set(false); },
      error: ()    => { this.avatarPreview.set(null);             this.uploadingAvatar.set(false); },
    });
  }

  onDeleteConfirmed(): void {
    this.userService.deleteUser().pipe(
      switchMap(() => this.authService.logout())
    ).subscribe();
  }

  onDeactivateConfirmed(): void {
    /* TODO */
  }
}