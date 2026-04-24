import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTransactionModal } from './accept-transaction-modal';

describe('AcceptTransactionModal', () => {
  let component: AcceptTransactionModal;
  let fixture: ComponentFixture<AcceptTransactionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptTransactionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptTransactionModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
