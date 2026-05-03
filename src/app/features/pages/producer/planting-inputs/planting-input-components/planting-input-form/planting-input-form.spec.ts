import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingInputForm } from './planting-input-form';

describe('PlantingInputForm', () => {
  let component: PlantingInputForm;
  let fixture: ComponentFixture<PlantingInputForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantingInputForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantingInputForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
