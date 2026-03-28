import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPhoto } from './step-photo';

describe('StepPhoto', () => {
  let component: StepPhoto;
  let fixture: ComponentFixture<StepPhoto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepPhoto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepPhoto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
