import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGeneral } from './step-general';

describe('StepGeneral', () => {
  let component: StepGeneral;
  let fixture: ComponentFixture<StepGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepGeneral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepGeneral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
