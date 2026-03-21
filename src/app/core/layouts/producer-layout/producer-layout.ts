import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { LayoutStateService } from '../../services/layout-state.service';
import { MeshGradient } from '../../../shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '../../../shared/components/pattern/pattern';
import { ICONS_PRODUCER_LAYOUT } from '../../ui/icons/icons-producer/icons-producer-layout.ts/icons-producer-layout';

@Component({
  selector: 'app-producer-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    FontAwesomeModule,
    MeshGradient,
    Pattern,
  ],
  templateUrl: './producer-layout.html',
})
export class ProducerLayout {
  private readonly authService   = inject(AuthService);
  private readonly elementRef    = inject(ElementRef);

  layoutState      = inject(LayoutStateService);
  currentUser      = toSignal(this.authService.currentUser$);
  icons            = ICONS_PRODUCER_LAYOUT;
  showUserDropdown = signal(false);

  toggleUserDropdown(): void {
    this.showUserDropdown.update(v => !v);
  }

  logout(): void {
    this.showUserDropdown.set(false);
    this.authService.logout().subscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showUserDropdown.set(false);
    }
  }
}