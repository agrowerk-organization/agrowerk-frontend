import { CommonModule } from '@angular/common';
import { Component, input, OnDestroy, output, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ICONS_REGISTER_LAYOUT } from '@core/ui/icons/icons-common/icons-register-layout/icons-register-layout';
@Component({
  selector: 'app-step-success',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './step-success.html',
})
export class StepSuccess implements OnDestroy {
   readonly email = input.required<string>();
   readonly goLogin = output<void>();
   readonly resend = output<void>();

  icons = ICONS_REGISTER_LAYOUT;

  cooldown = signal(0);
  resendLoading = signal(false);
  private timer?: ReturnType<typeof setInterval>;

  onResend(): void {
    this.resend.emit();
    this.cooldown.set(120);
    this.timer = setInterval(() => {
      this.cooldown.update(v => {
        if (v <= 1) { clearInterval(this.timer); return 0; }
        return v - 1;
      });
    }, 1000);
  }

  ngOnDestroy(): void { clearInterval(this.timer); }

}
