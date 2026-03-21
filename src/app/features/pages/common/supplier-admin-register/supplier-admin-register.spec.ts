import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAdminRegister } from './supplier-admin-register';

describe('SupplierAdminRegister', () => {
  let component: SupplierAdminRegister;
  let fixture: ComponentFixture<SupplierAdminRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierAdminRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierAdminRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
