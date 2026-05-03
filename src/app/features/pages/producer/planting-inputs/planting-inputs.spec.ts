import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingInputs } from './planting-inputs';

describe('PlantingInputs', () => {
  let component: PlantingInputs;
  let fixture: ComponentFixture<PlantingInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantingInputs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantingInputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
