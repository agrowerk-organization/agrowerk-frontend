import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCategories } from './input-categories';

describe('InputCategories', () => {
  let component: InputCategories;
  let fixture: ComponentFixture<InputCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
