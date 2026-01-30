import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseDetails } from './phase-details';

describe('PhaseDetails', () => {
  let component: PhaseDetails;
  let fixture: ComponentFixture<PhaseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
