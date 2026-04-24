import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfferModal } from './create-offer-modal';

describe('CreateOfferModal', () => {
  let component: CreateOfferModal;
  let fixture: ComponentFixture<CreateOfferModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOfferModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOfferModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
