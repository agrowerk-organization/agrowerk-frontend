import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { ICONS_USER_PROFILE } from '@core/ui/icons/icons-producer/icons-profile/icons-profile';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-profile-account',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile-account.html',
})
export class ProfileAccount {
  deleteConfirmed = output<void>();
  deactivateConfirmed = output<void>();

  confirmDelete = signal(false);
  confirmDeactivate = signal(false);

  icons = ICONS_USER_PROFILE;

  onDelete(): void {
    this.deleteConfirmed.emit();
    this.confirmDelete.set(false);
  }

  onDeactivate(): void {
    this.deactivateConfirmed.emit();
    this.confirmDeactivate.set(false);
  }
}
