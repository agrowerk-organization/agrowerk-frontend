import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingCard } from './planting-card';

describe('PlantingCard', () => {
  let component: PlantingCard;
  let fixture: ComponentFixture<PlantingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantingCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantingCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
