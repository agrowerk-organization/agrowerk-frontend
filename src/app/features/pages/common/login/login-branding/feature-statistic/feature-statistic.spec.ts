import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStatistic } from './feature-statistic';

describe('FeatureStatistic', () => {
  let component: FeatureStatistic;
  let fixture: ComponentFixture<FeatureStatistic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureStatistic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureStatistic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
