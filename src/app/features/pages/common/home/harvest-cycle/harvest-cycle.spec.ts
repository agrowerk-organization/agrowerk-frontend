import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestCycle } from './harvest-cycle';

describe('HarvestCycle', () => {
  let component: HarvestCycle;
  let fixture: ComponentFixture<HarvestCycle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestCycle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestCycle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
