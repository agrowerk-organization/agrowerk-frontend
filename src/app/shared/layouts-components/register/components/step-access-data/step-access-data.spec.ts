import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAccessData } from './step-access-data';

describe('StepAccessData', () => {
  let component: StepAccessData;
  let fixture: ComponentFixture<StepAccessData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepAccessData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepAccessData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
