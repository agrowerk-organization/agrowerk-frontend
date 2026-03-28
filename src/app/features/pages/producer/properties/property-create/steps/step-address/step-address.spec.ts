import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAddress } from './step-address';

describe('StepAddress', () => {
  let component: StepAddress;
  let fixture: ComponentFixture<StepAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepAddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
