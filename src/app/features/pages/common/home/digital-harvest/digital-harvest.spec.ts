import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalHarvest } from './digital-harvest';

describe('DigitalHarvest', () => {
  let component: DigitalHarvest;
  let fixture: ComponentFixture<DigitalHarvest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalHarvest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalHarvest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
