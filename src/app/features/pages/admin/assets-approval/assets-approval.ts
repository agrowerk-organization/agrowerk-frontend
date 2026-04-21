import { CommonModule } from '@angular/common';
import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_ADMIN_INPUTS } from '@core/ui/icons/icons-admin/icons-admin-inputs/icons-admin-inputs';
import { InputCropService } from '@core/services/input-crop.service';
import { InputCropResponse } from '@core/types/input/input-crop.response';
import { Title } from '@shared/components/title/title';
import { Subtitle } from '@shared/components/subtitle/subtitle';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';

@Component({
  selector: 'app-asset-approval',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    Title, 
    Subtitle, 
    ButtonPages
  ],
  templateUrl: './assets-approval.html', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsApproval implements OnInit {
  private readonly inputCropService = inject(InputCropService);

  protected readonly icons = ICONS_ADMIN_INPUTS;

  readonly loading = signal(false);
  readonly pending = signal<InputCropResponse[]>([]);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.inputCropService.findPending().subscribe({
      next: (items) => { this.pending.set(items); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  onApprove(id: string): void {
    this.inputCropService.approve(id).subscribe(() => {
      this.pending.update(list => list.filter(i => i.id !== id));
    });
  }

  onReject(id: string): void {
    this.inputCropService.reject(id).subscribe(() => {
      this.pending.update(list => list.filter(i => i.id !== id));
    });
  }
}
