import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAuth } from './navbar-auth';

describe('NavbarAuth', () => {
  let component: NavbarAuth;
  let fixture: ComponentFixture<NavbarAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAuth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAuth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
