import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerDashboard } from './dashboard';

describe('Dashboard', () => {
  let component: ProducerDashboard;
  let fixture: ComponentFixture<ProducerDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
