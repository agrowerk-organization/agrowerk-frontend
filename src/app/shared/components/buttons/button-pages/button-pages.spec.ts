import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPages } from './button-pages';

describe('ButtonPages', () => {
  let component: ButtonPages;
  let fixture: ComponentFixture<ButtonPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
