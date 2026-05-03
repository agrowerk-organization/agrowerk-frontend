import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestForecastCard } from './harvest-forecast-card';

describe('HarvestForecastCard', () => {
  let component: HarvestForecastCard;
  let fixture: ComponentFixture<HarvestForecastCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestForecastCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestForecastCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
