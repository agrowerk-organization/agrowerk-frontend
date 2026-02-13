import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatTrend } from './stat-trend';

describe('StatTrend', () => {
  let component: StatTrend;
  let fixture: ComponentFixture<StatTrend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatTrend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatTrend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
