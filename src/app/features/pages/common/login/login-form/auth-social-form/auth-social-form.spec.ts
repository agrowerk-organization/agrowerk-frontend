import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSocialForm } from './auth-social-form';

describe('AuthSocialForm', () => {
  let component: AuthSocialForm;
  let fixture: ComponentFixture<AuthSocialForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSocialForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSocialForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
