import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCategoryCard } from './input-category-card';

describe('InputCategoryCard', () => {
  let component: InputCategoryCard;
  let fixture: ComponentFixture<InputCategoryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCategoryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCategoryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
