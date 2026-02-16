import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPages } from './card-pages';

describe('CardPages', () => {
  let component: CardPages;
  let fixture: ComponentFixture<CardPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
