import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeSelector } from './user-type-selector';

describe('UserTypeSelector', () => {
  let component: UserTypeSelector;
  let fixture: ComponentFixture<UserTypeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypeSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
