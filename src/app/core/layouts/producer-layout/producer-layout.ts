import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth.service';
import { LayoutStateService } from '../../services/layout-state.service';
import { toSignal } from '@angular/core/rxjs-interop';
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
    Pattern
  ],
  templateUrl: './producer-layout.html'
})
export class ProducerLayout {
  private router = inject(Router);
  private authService = inject(AuthService);

  layoutState = inject(LayoutStateService);
  currentUser = toSignal(this.authService.currentUser$);

  icons = ICONS_PRODUCER_LAYOUT;

}
