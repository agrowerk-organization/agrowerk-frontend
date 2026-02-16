import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPerson } from './card-person';

describe('CardPerson', () => {
  let component: CardPerson;
  let fixture: ComponentFixture<CardPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPerson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPerson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
