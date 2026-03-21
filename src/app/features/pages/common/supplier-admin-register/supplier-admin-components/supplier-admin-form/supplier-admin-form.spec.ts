import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAdminForm } from './supplier-admin-form';

describe('SupplierAdminForm', () => {
  let component: SupplierAdminForm;
  let fixture: ComponentFixture<SupplierAdminForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierAdminForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierAdminForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
