import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCode } from './step-code';

describe('StepCode', () => {
  let component: StepCode;
  let fixture: ComponentFixture<StepCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepCode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
