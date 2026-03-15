import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingDetail } from './planting-detail';

describe('PlantingDetail', () => {
  let component: PlantingDetail;
  let fixture: ComponentFixture<PlantingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantingDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantingDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
