import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseConnector } from './phase-connector';

describe('PhaseConnector', () => {
  let component: PhaseConnector;
  let fixture: ComponentFixture<PhaseConnector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseConnector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseConnector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
