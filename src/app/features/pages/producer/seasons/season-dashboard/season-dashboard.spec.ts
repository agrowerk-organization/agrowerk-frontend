import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonDashboard } from './season-dashboard';

describe('SeasonDashboard', () => {
  let component: SeasonDashboard;
  let fixture: ComponentFixture<SeasonDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
