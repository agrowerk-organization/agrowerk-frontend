import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalPracticeCard } from './agricultural-practice-card';

describe('AgriculturalPracticeCard', () => {
  let component: AgriculturalPracticeCard;
  let fixture: ComponentFixture<AgriculturalPracticeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculturalPracticeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalPracticeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
