import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPersonalData } from './step-personal-data';

describe('StepPersonalData', () => {
  let component: StepPersonalData;
  let fixture: ComponentFixture<StepPersonalData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepPersonalData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepPersonalData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
