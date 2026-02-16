import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTitle } from './text-title';

describe('TextTitle', () => {
  let component: TextTitle;
  let fixture: ComponentFixture<TextTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
