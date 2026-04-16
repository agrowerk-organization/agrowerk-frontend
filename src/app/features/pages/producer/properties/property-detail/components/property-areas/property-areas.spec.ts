import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAreas } from './property-areas';

describe('PropertyAreas', () => {
  let component: PropertyAreas;
  let fixture: ComponentFixture<PropertyAreas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyAreas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyAreas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
