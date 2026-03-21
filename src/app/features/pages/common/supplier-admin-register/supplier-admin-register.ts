import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SupplierAdminBranding } from './supplier-admin-components/supplier-admin-branding/supplier-admin-branding';
import { SupplierAdminForm } from './supplier-admin-components/supplier-admin-form/supplier-admin-form';

@Component({
  selector: 'app-supplier-admin-register',
  standalone: true,
  imports: [CommonModule, SupplierAdminBranding, SupplierAdminForm],
  templateUrl: './supplier-admin-register.html',
})
export class SupplierAdminRegister {

}
