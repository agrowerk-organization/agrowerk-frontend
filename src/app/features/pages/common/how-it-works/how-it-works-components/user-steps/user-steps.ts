import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserStep } from '@core/ui/types/user/user-step';
import { ICONS_HOW_IT_WORKS } from '@core/ui/icons/icons-common/icons-how-it-works/icons.how-it-works';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
@Component({
  selector: 'app-user-steps',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonPages],
  templateUrl: './user-steps.html'
})
export class UserSteps {
  private router = inject(Router);
  icons = ICONS_HOW_IT_WORKS;
  currentSteps = input.required<UserStep[]>();  

  handleAction: () => void = () => this.router.navigate(['/register']);
}
