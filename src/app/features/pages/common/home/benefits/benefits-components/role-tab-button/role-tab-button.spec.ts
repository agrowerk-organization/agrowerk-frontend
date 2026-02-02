import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTabButton } from './role-tab-button';

describe('RoleTabButton', () => {
  let component: RoleTabButton;
  let fixture: ComponentFixture<RoleTabButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleTabButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleTabButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
