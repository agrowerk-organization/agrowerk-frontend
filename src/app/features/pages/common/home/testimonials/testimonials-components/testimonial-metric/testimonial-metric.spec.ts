import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialMetric } from './testimonial-metric';

describe('TestimonialMetric', () => {
  let component: TestimonialMetric;
  let fixture: ComponentFixture<TestimonialMetric>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialMetric]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialMetric);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
