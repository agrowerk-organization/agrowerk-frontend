import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfferModal } from './edit-offer-modal';

describe('EditOfferModal', () => {
  let component: EditOfferModal;
  let fixture: ComponentFixture<EditOfferModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOfferModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOfferModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
