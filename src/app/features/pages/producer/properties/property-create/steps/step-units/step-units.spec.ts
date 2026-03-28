import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepUnits } from './step-units';

describe('StepUnits', () => {
  let component: StepUnits;
  let fixture: ComponentFixture<StepUnits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepUnits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepUnits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
