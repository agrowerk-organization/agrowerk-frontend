import { Component, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ICONS_REGISTER_LAYOUT } from '@core/ui/icons/icons-common/icons-register-layout/icons-register-layout';

@Component({
  selector: 'app-step-reset-success',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './step-reset-success.html',
})
export class StepResetSuccess {
  goLogin = output<void>();
  icons   = ICONS_REGISTER_LAYOUT;
}