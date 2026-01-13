import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trust } from './trust';

describe('Trust', () => {
  let component: Trust;
  let fixture: ComponentFixture<Trust>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trust]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trust);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
