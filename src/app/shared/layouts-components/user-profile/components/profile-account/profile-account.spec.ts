import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAccount } from './profile-account';

describe('ProfileAccount', () => {
  let component: ProfileAccount;
  let fixture: ComponentFixture<ProfileAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
