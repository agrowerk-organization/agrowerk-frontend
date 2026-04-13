import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarDisplay } from './avatar-display';

describe('AvatarDisplay', () => {
  let component: AvatarDisplay;
  let fixture: ComponentFixture<AvatarDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
