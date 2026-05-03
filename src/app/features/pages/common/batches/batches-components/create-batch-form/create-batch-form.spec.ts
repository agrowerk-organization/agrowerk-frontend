import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBatchForm } from './create-batch-form';

describe('CreateBatchForm', () => {
  let component: CreateBatchForm;
  let fixture: ComponentFixture<CreateBatchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBatchForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBatchForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
