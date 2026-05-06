import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalPractices } from './agricultural-practices';

describe('AgriculturalPractices', () => {
  let component: AgriculturalPractices;
  let fixture: ComponentFixture<AgriculturalPractices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculturalPractices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalPractices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
