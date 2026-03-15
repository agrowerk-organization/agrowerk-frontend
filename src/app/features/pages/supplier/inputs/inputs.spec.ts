import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInputs } from './inputs';

describe('SupplierInputs', () => {
  let component: SupplierInputs;
  let fixture: ComponentFixture<SupplierInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierInputs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierInputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
