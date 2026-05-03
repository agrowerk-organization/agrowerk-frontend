import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingInputCard } from './planting-input-card';

describe('PlantingInputCard', () => {
  let component: PlantingInputCard;
  let fixture: ComponentFixture<PlantingInputCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantingInputCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantingInputCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
