import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonalData } from './profile-personal-data';

describe('ProfilePersonalData', () => {
  let component: ProfilePersonalData;
  let fixture: ComponentFixture<ProfilePersonalData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePersonalData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePersonalData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
