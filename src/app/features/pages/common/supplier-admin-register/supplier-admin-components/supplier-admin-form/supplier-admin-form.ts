import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Register } from '@shared/layouts-components/register/register';
import { AccessProfile } from '@core/enums/access-profile';
@Component({
  selector: 'app-supplier-admin-form',
  standalone: true,
  imports: [CommonModule, Register],
  templateUrl: './supplier-admin-form.html'
})
export class SupplierAdminForm {

  readonly AccessProfile = AccessProfile;
  
}