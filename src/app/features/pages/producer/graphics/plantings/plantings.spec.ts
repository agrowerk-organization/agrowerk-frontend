import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plantings } from './plantings';

describe('Plantings', () => {
  let component: Plantings;
  let fixture: ComponentFixture<Plantings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plantings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Plantings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
