import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAlerts } from './market-alerts';

describe('MarketAlerts', () => {
  let component: MarketAlerts;
  let fixture: ComponentFixture<MarketAlerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketAlerts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketAlerts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
