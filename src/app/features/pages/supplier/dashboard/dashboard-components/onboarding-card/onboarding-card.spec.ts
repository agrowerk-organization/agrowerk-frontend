import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingCard } from './onboarding-card';

describe('OnboardingCard', () => {
  let component: OnboardingCard;
  let fixture: ComponentFixture<OnboardingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
