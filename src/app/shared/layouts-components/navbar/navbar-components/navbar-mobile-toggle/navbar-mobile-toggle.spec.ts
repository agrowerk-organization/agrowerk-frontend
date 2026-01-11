import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMobileToggle } from './navbar-mobile-toggle';

describe('NavbarMobileToggle', () => {
  let component: NavbarMobileToggle;
  let fixture: ComponentFixture<NavbarMobileToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarMobileToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMobileToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
