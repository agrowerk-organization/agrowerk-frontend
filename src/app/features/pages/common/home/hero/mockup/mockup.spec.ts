import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mockup } from './mockup';

describe('Mockup', () => {
  let component: Mockup;
  let fixture: ComponentFixture<Mockup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mockup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mockup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
