import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAdminBranding } from './supplier-admin-branding';

describe('SupplierAdminBranding', () => {
  let component: SupplierAdminBranding;
  let fixture: ComponentFixture<SupplierAdminBranding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierAdminBranding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierAdminBranding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
