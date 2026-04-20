import { Component, computed, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UserInfo } from '@core/types/user/user.info';
import { UserProfileResponse } from '@core/types/user/user-profile.response';

export interface UserMenuIcons {
  USER: IconDefinition;
  RIGHT_TO_BRACKET: IconDefinition;
}

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './user-menu.html'
})
export class UserMenu {
  private readonly elementRef = inject(ElementRef);

  readonly user = input<UserInfo | null>();
  readonly profile = input<UserProfileResponse | null>();
  readonly icons = input.required<UserMenuIcons>();

  readonly logout = output<void>();

  readonly showUserDropdown = signal(false);

  readonly baseRoute = input.required<string>();

  readonly profileLink = computed(() => `/${this.baseRoute()}/profile`);

  toggleDropdown(): void {
    this.showUserDropdown.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.showUserDropdown.set(false);
    }
  }

  onLogout(): void {
    this.showUserDropdown.set(false);
    this.logout.emit();
  }
}