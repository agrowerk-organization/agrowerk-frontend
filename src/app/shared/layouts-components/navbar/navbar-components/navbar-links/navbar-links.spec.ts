import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLinks } from './navbar-links';

describe('NavbarLinks', () => {
  let component: NavbarLinks;
  let fixture: ComponentFixture<NavbarLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLinks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
