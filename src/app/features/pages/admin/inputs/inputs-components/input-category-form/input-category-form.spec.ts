import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCategoryForm } from './input-category-form';

describe('InputCategoryForm', () => {
  let component: InputCategoryForm;
  let fixture: ComponentFixture<InputCategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCategoryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCategoryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
