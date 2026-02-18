import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSteps } from './user-steps';

describe('UserSteps', () => {
  let component: UserSteps;
  let fixture: ComponentFixture<UserSteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSteps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSteps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
