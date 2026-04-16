import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketChart } from './market-chart';

describe('MarketChart', () => {
  let component: MarketChart;
  let fixture: ComponentFixture<MarketChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
