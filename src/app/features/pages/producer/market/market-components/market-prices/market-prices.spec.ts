import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPrices } from './market-prices';

describe('MarketPrices', () => {
  let component: MarketPrices;
  let fixture: ComponentFixture<MarketPrices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketPrices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketPrices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
