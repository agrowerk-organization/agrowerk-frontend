import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingForm } from './planting-form';

describe('PlantingForm', () => {
  let component: PlantingForm;
  let fixture: ComponentFixture<PlantingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantingForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
