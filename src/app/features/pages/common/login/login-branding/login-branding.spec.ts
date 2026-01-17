import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBranding } from './login-branding';

describe('LoginBranding', () => {
  let component: LoginBranding;
  let fixture: ComponentFixture<LoginBranding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBranding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBranding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
