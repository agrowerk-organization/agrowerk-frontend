import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveAlertModal } from './resolve-alert-modal';

describe('ResolveAlertModal', () => {
  let component: ResolveAlertModal;
  let fixture: ComponentFixture<ResolveAlertModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolveAlertModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolveAlertModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
