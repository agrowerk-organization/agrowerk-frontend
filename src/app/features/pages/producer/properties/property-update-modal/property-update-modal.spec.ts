import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUpdateModal } from './property-update-modal';

describe('PropertyUpdateModal', () => {
  let component: PropertyUpdateModal;
  let fixture: ComponentFixture<PropertyUpdateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyUpdateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyUpdateModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
