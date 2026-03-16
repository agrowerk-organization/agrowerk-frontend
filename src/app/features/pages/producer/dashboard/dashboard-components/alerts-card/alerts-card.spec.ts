import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsCard } from './alerts-card';

describe('AlertsCard', () => {
  let component: AlertsCard;
  let fixture: ComponentFixture<AlertsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
