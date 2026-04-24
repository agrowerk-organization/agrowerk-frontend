import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarterOfferCard } from './barter-offer-card';

describe('BarterOfferCard', () => {
  let component: BarterOfferCard;
  let fixture: ComponentFixture<BarterOfferCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarterOfferCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarterOfferCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
