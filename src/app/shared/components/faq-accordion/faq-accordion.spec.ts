import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAccordion } from './faq-accordion';

describe('FaqAccordion', () => {
  let component: FaqAccordion;
  let fixture: ComponentFixture<FaqAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqAccordion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqAccordion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
