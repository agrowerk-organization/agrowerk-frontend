import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { BarterTransactionService } from '@core/services/barter-transaction.service';
import { BarterContractResponse } from '@core/types/barter/barter-contract.response';
import { ICONS_BARTER } from '@core/ui/icons/icons-common/icons-barter/icons-barter';

@Component({
  selector: 'app-sign-contract-modal',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    FontAwesomeModule, 
    ButtonPages, 
    DatePipe
  ],
  templateUrl: './sign-contract-modal.html'
})
export class SignContractModal {

  contract = input.required<BarterContractResponse>();

  toCancel = output<void>();
  signed   = output<void>();

  private txService = inject(BarterTransactionService);

  saving   = signal(false);
  accepted = false;

  readonly icons = ICONS_BARTER;

  sign(): void {
    if (!this.accepted || this.saving()) return;
  
    this.saving.set(true);
    this.txService.signContract(this.contract().id).subscribe({
      next: () => {
        this.saving.set(false);
        this.signed.emit();
      },
      error: () => this.saving.set(false),
    });
  }
}