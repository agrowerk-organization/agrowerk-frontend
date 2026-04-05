import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepResetSuccess } from './step-reset-success';

describe('StepResetSuccess', () => {
  let component: StepResetSuccess;
  let fixture: ComponentFixture<StepResetSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepResetSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepResetSuccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
