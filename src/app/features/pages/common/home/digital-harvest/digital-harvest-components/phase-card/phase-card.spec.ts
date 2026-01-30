import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseCard } from './phase-card';

describe('PhaseCard', () => {
  let component: PhaseCard;
  let fixture: ComponentFixture<PhaseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
