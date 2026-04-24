import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignContractModal } from './sign-contract-modal';

describe('SignContractModal', () => {
  let component: SignContractModal;
  let fixture: ComponentFixture<SignContractModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignContractModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignContractModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
