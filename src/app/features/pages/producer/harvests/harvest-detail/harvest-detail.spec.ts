import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestDetail } from './harvest-detail';

describe('HarvestDetail', () => {
  let component: HarvestDetail;
  let fixture: ComponentFixture<HarvestDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
