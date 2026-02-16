import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionVision } from './mission-vision';

describe('MissionVision', () => {
  let component: MissionVision;
  let fixture: ComponentFixture<MissionVision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionVision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionVision);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
