import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAddress } from './property-address';

describe('PropertyAddress', () => {
  let component: PropertyAddress;
  let fixture: ComponentFixture<PropertyAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyAddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
