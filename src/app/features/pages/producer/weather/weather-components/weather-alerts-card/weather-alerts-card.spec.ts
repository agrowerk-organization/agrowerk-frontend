import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAlertsCard } from './weather-alerts-card';

describe('WeatherAlertsCard', () => {
  let component: WeatherAlertsCard;
  let fixture: ComponentFixture<WeatherAlertsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherAlertsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherAlertsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
