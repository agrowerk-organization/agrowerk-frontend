import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestForecasts } from './harvest-forecasts';

describe('HarvestForecasts', () => {
  let component: HarvestForecasts;
  let fixture: ComponentFixture<HarvestForecasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestForecasts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestForecasts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
