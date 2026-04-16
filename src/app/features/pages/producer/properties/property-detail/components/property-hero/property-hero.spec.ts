import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyHero } from './property-hero';

describe('PropertyHero', () => {
  let component: PropertyHero;
  let fixture: ComponentFixture<PropertyHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
