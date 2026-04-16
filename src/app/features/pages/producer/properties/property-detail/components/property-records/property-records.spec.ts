import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRecords } from './property-records';

describe('PropertyRecords', () => {
  let component: PropertyRecords;
  let fixture: ComponentFixture<PropertyRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyRecords]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyRecords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
