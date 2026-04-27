import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSelectField } from './batch-select-field';

describe('BatchSelectField', () => {
  let component: BatchSelectField;
  let fixture: ComponentFixture<BatchSelectField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchSelectField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchSelectField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
