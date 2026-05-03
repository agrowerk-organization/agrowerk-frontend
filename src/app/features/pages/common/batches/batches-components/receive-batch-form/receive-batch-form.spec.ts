import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveBatchForm } from './receive-batch-form';

describe('ReceiveBatchForm', () => {
  let component: ReceiveBatchForm;
  let fixture: ComponentFixture<ReceiveBatchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveBatchForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveBatchForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
