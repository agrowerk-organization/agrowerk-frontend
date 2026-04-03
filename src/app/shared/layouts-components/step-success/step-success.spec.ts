import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSuccess } from './step-success';

describe('StepSuccess', () => {
  let component: StepSuccess;
  let fixture: ComponentFixture<StepSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepSuccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
