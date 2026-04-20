import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePrivacy } from './profile-privacy';

describe('ProfilePrivacy', () => {
  let component: ProfilePrivacy;
  let fixture: ComponentFixture<ProfilePrivacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePrivacy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePrivacy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
