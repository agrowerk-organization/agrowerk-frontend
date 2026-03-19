import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBranding } from './update-branding';

describe('UpdateBranding', () => {
  let component: UpdateBranding;
  let fixture: ComponentFixture<UpdateBranding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBranding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBranding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
