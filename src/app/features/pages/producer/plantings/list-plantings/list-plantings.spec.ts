import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlantings } from './list-plantings';

describe('ListPlantings', () => {
  let component: ListPlantings;
  let fixture: ComponentFixture<ListPlantings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlantings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlantings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
