import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketReports } from './market-reports';

describe('MarketReports', () => {
  let component: MarketReports;
  let fixture: ComponentFixture<MarketReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
