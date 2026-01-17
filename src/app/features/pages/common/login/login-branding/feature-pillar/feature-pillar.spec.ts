import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePillar } from './feature-pillar';

describe('FeaturePillar', () => {
  let component: FeaturePillar;
  let fixture: ComponentFixture<FeaturePillar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePillar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturePillar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
