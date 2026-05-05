import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestCard } from './harvest-card';

describe('HarvestCard', () => {
  let component: HarvestCard;
  let fixture: ComponentFixture<HarvestCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
