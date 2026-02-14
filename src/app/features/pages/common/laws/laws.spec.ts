import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Laws } from './laws';

describe('Laws', () => {
  let component: Laws;
  let fixture: ComponentFixture<Laws>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Laws]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Laws);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
