import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropVarietyForm } from './crop-variety-form';

describe('CropVarietyForm', () => {
  let component: CropVarietyForm;
  let fixture: ComponentFixture<CropVarietyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropVarietyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropVarietyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
