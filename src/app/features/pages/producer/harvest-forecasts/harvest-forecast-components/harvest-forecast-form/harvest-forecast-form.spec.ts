import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestForecastForm } from './harvest-forecast-form';

describe('HarvestForecastForm', () => {
  let component: HarvestForecastForm;
  let fixture: ComponentFixture<HarvestForecastForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestForecastForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestForecastForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
