import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqPreview } from './faq-preview';

describe('FaqPreview', () => {
  let component: FaqPreview;
  let fixture: ComponentFixture<FaqPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
