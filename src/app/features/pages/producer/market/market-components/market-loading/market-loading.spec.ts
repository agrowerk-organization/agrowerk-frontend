import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketLoading } from './market-loading';

describe('MarketLoading', () => {
  let component: MarketLoading;
  let fixture: ComponentFixture<MarketLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
