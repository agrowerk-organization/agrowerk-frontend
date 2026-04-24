import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeTransactionModal } from './propose-transaction-modal';

describe('ProposeTransactionModal', () => {
  let component: ProposeTransactionModal;
  let fixture: ComponentFixture<ProposeTransactionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposeTransactionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposeTransactionModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
