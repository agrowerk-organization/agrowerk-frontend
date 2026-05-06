import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalPracticeForm } from './agricultural-practice-form';

describe('AgriculturalPracticeForm', () => {
  let component: AgriculturalPracticeForm;
  let fixture: ComponentFixture<AgriculturalPracticeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculturalPracticeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalPracticeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
